import type { MatchResult, LeaderboardSeason, MatchSummary, LeaderboardDetails,TopPlayer } from '../types';
import { formatDuration } from './utils';

const FACEIT_API_URL = 'https://open.faceit.com/data/v4';
const API_KEY = '31a0f009-6cde-4e0d-98ce-4c10b21e2714';

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Accept': 'application/json',
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }
  const data = await response.json();
  return data;
}

export async function fetchTopPlayers(): Promise<TopPlayer[]> {
  try {
    const [response1, response2] = await Promise.all([
      fetch(`${FACEIT_API_URL}/rankings/games/cs2/regions/SA?offset=0&limit=100`, { headers }),
      fetch(`${FACEIT_API_URL}/rankings/games/cs2/regions/SA?offset=100&limit=100`, { headers })
    ]);

    const [data1, data2] = await Promise.all([
      handleResponse<{ items: TopPlayer[] }>(response1),
      handleResponse<{ items: TopPlayer[] }>(response2)
    ]);

    return [...(data1.items || []), ...(data2.items || [])];
  } catch (error) {
    console.error('Error fetching top players:', error);
    return [];
  }
}

export async function fetchMatchStats(matchId: string): Promise<MatchResult> {
  const [statsResponse, matchResponse] = await Promise.all([
    fetch(`${FACEIT_API_URL}/matches/${matchId}/stats`, { headers }),
    fetch(`${FACEIT_API_URL}/matches/${matchId}`, { headers })
  ]);

  if (!statsResponse.ok || !matchResponse.ok) {
    throw new Error('Failed to fetch match stats');
  }

  const statsData = await statsResponse.json();
  const matchData = await matchResponse.json();
  const round = statsData.rounds[0];
  
  return {
    teams: round.teams.map((team: any) => ({
      name: team.team_stats.Team,
      score: parseInt(team.team_stats['Final Score']),
      side: team === round.teams[0] ? 'CT' : 'T',
      players: team.players.map((player: any) => ({
        name: player.nickname,
        kills: parseInt(player.player_stats.Kills),
        assists: parseInt(player.player_stats.Assists),
        deaths: parseInt(player.player_stats.Deaths),
        kRatio: parseFloat(player.player_stats['K/R Ratio']),
        kdRatio: parseFloat(player.player_stats['K/D Ratio']),
        headshots: parseInt(player.player_stats.Headshots),
        headshotPercentage: parseInt(player.player_stats['Headshots %']),
        mvps: parseInt(player.player_stats.MVPs),
        tripleKills: parseInt(player.player_stats['Triple Kills']),
        quadroKills: parseInt(player.player_stats['Quadro Kills']),
        pentaKills: parseInt(player.player_stats['Penta Kills']),
        adr: parseFloat(player.player_stats.ADR),
      })),
    })),
    map: round.round_stats.Map,
    duration: formatDuration(matchData.started_at, matchData.finished_at),
  };
}

export async function fetchLeaderboards(hubId: string): Promise<LeaderboardSeason[]> {
  const response = await fetch(`${FACEIT_API_URL}/leaderboards/hubs/${hubId}`, { headers });

  if (!response.ok) {
    throw new Error('Failed to fetch leaderboards');
  }

  const data = await response.json();
  return data.items;
}

export async function fetchLeaderboardDetails(leaderboardId: string, offset = 0, limit = 20): Promise<LeaderboardDetails> {
  const response = await fetch(
    `${FACEIT_API_URL}/leaderboards/${leaderboardId}?offset=${offset}&limit=${limit}`, 
    { headers }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch leaderboard details');
  }

  return await response.json();
}

export async function fetchMatchHistory(hubId: string, offset = 0, limit = 20): Promise<MatchSummary[]> {
  const [pastMatches, liveMatches] = await Promise.all([
    fetch(`${FACEIT_API_URL}/hubs/${hubId}/matches?type=past&offset=${offset}&limit=${limit}`, { headers })
      .then(res => res.json())
      .then(data => data.items),
    fetch(`${FACEIT_API_URL}/hubs/${hubId}/matches?type=live&offset=0&limit=20`, { headers })
      .then(res => res.json())
      .then(data => data.items)
  ]);

  const formatMatch = (match: any) => ({
    match_id: match.match_id,
    started_at: match.started_at,
    finished_at: match.finished_at,
    status: match.status,
    map: match.voting?.map?.pick?.[0] || 'Unknown',
    teams: {
      faction1: {
        name: match.teams.faction1.name,
        score: match.results?.score?.faction1 || 0,
        roster: match.teams.faction1.roster,
      },
      faction2: {
        name: match.teams.faction2.name,
        score: match.results?.score?.faction2 || 0,
        roster: match.teams.faction2.roster,
      },
    },
  });

  const formattedLiveMatches = liveMatches.map(formatMatch);
  const formattedPastMatches = pastMatches
    .filter((match: any) => match.status !== 'CANCELLED')
    .map(formatMatch);

  return [...formattedLiveMatches, ...formattedPastMatches];
}
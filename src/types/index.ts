export interface Player {
  name: string;
  kills: number;
  assists: number;
  deaths: number;
  kRatio: number;
  kdRatio: number;
  headshots: number;
  headshotPercentage: number;
  mvps: number;
  tripleKills: number;
  quadroKills: number;
  pentaKills: number;
  adr: number;
}

export interface MatchPlayer {
  player_id: string;
  nickname: string;
  avatar: string;
  game_player_id: string;
  game_player_name: string;
  game_skill_level: number;
}

export interface Team {
  name: string;
  score: number;
  players: Player[];
  side: 'CT' | 'T';
}

export interface MatchResult {
  teams: [Team, Team];
  map: string;
  duration: string;
}

export interface LeaderboardSeason {
  leaderboard_id: string;
  leaderboard_name: string;
  start_date: number;
  end_date: number;
  status: string;
  points_per_win: number;
  points_per_loss: number;
  points_per_draw: number;
  season: number;
}

export interface LeaderboardPlayer {
  player: {
    nickname: string;
    avatar: string;
    country: string;
  };
  position: number;
  played: number;
  won: number;
  lost: number;
  win_rate: number;
  current_streak: number;
}

export interface LeaderboardDetails {
  leaderboard: LeaderboardSeason;
  items: LeaderboardPlayer[];
}

export interface MatchSummary {
  match_id: string;
  started_at: number;
  finished_at: number;
  status: string;
  map: string;
  teams: {
    faction1: {
      name: string;
      score: number;
      roster: MatchPlayer[];
    };
    faction2: {
      name: string;
      score: number;
      roster: MatchPlayer[];
    };
  };
}
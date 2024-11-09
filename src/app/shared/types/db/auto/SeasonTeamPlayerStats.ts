import { DbUtils } from '../../../utils/db-utils';
import { Table } from '../Table';

export class SeasonTeamPlayerStats implements Table {

    id: number | undefined;
    season_id: number | undefined;
    team_id: number | undefined;
    player_id: number | undefined;
    games: number | undefined;
    minutes_played: number | undefined;
    field_goals: number | undefined;
    field_goal_attempts: number | undefined;
    field_goal_percentage: any | undefined;
    three_point_field_goals: number | undefined;
    three_point_field_goal_attemps: number | undefined;
    three_point_field_goal_percentage: any | undefined;
    two_point_field_goals: number | undefined;
    two_point_field_goal_attempts: number | undefined;
    two_point_field_goal_percentage: any | undefined;
    effective_field_goal_percentage: any | undefined;
    free_throws: number | undefined;
    free_throw_attempts: number | undefined;
    free_throw_percentage: any | undefined;
    offensive_rebounds: number | undefined;
    difensive_rebounds: number | undefined;
    total_rebounds: number | undefined;
    assists: number | undefined;
    steals: number | undefined;
    blocks: number | undefined;
    turnovers: number | undefined;
    personal_fouls: number | undefined;
    points: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.season_id = values.season_id;
            this.team_id = values.team_id;
            this.player_id = values.player_id;
            this.games = values.games;
            this.minutes_played = values.minutes_played;
            this.field_goals = values.field_goals;
            this.field_goal_attempts = values.field_goal_attempts;
            this.field_goal_percentage = values.field_goal_percentage;
            this.three_point_field_goals = values.three_point_field_goals;
            this.three_point_field_goal_attemps = values.three_point_field_goal_attemps;
            this.three_point_field_goal_percentage = values.three_point_field_goal_percentage;
            this.two_point_field_goals = values.two_point_field_goals;
            this.two_point_field_goal_attempts = values.two_point_field_goal_attempts;
            this.two_point_field_goal_percentage = values.two_point_field_goal_percentage;
            this.effective_field_goal_percentage = values.effective_field_goal_percentage;
            this.free_throws = values.free_throws;
            this.free_throw_attempts = values.free_throw_attempts;
            this.free_throw_percentage = values.free_throw_percentage;
            this.offensive_rebounds = values.offensive_rebounds;
            this.difensive_rebounds = values.difensive_rebounds;
            this.total_rebounds = values.total_rebounds;
            this.assists = values.assists;
            this.steals = values.steals;
            this.blocks = values.blocks;
            this.turnovers = values.turnovers;
            this.personal_fouls = values.personal_fouls;
            this.points = values.points;
        }
    }

    getName(): string {
        return 'season_team_player_stats';
    }

    getFields(): string[] {
        return [
            'id',
            'season_id',
            'team_id',
            'player_id',
            'games',
            'minutes_played',
            'field_goals',
            'field_goal_attempts',
            'field_goal_percentage',
            'three_point_field_goals',
            'three_point_field_goal_attemps',
            'three_point_field_goal_percentage',
            'two_point_field_goals',
            'two_point_field_goal_attempts',
            'two_point_field_goal_percentage',
            'effective_field_goal_percentage',
            'free_throws',
            'free_throw_attempts',
            'free_throw_percentage',
            'offensive_rebounds',
            'difensive_rebounds',
            'total_rebounds',
            'assists',
            'steals',
            'blocks',
            'turnovers',
            'personal_fouls',
            'points',
        ];
    }

    fromDbValues(values: any): SeasonTeamPlayerStats {
        const newSeasonTeamPlayerStats = new SeasonTeamPlayerStats();
        newSeasonTeamPlayerStats.id = values.id;
        newSeasonTeamPlayerStats.season_id = values.season_id;
        newSeasonTeamPlayerStats.team_id = values.team_id;
        newSeasonTeamPlayerStats.player_id = values.player_id;
        newSeasonTeamPlayerStats.games = values.games;
        newSeasonTeamPlayerStats.minutes_played = values.minutes_played;
        newSeasonTeamPlayerStats.field_goals = values.field_goals;
        newSeasonTeamPlayerStats.field_goal_attempts = values.field_goal_attempts;
        newSeasonTeamPlayerStats.field_goal_percentage = values.field_goal_percentage;
        newSeasonTeamPlayerStats.three_point_field_goals = values.three_point_field_goals;
        newSeasonTeamPlayerStats.three_point_field_goal_attemps = values.three_point_field_goal_attemps;
        newSeasonTeamPlayerStats.three_point_field_goal_percentage = values.three_point_field_goal_percentage;
        newSeasonTeamPlayerStats.two_point_field_goals = values.two_point_field_goals;
        newSeasonTeamPlayerStats.two_point_field_goal_attempts = values.two_point_field_goal_attempts;
        newSeasonTeamPlayerStats.two_point_field_goal_percentage = values.two_point_field_goal_percentage;
        newSeasonTeamPlayerStats.effective_field_goal_percentage = values.effective_field_goal_percentage;
        newSeasonTeamPlayerStats.free_throws = values.free_throws;
        newSeasonTeamPlayerStats.free_throw_attempts = values.free_throw_attempts;
        newSeasonTeamPlayerStats.free_throw_percentage = values.free_throw_percentage;
        newSeasonTeamPlayerStats.offensive_rebounds = values.offensive_rebounds;
        newSeasonTeamPlayerStats.difensive_rebounds = values.difensive_rebounds;
        newSeasonTeamPlayerStats.total_rebounds = values.total_rebounds;
        newSeasonTeamPlayerStats.assists = values.assists;
        newSeasonTeamPlayerStats.steals = values.steals;
        newSeasonTeamPlayerStats.blocks = values.blocks;
        newSeasonTeamPlayerStats.turnovers = values.turnovers;
        newSeasonTeamPlayerStats.personal_fouls = values.personal_fouls;
        newSeasonTeamPlayerStats.points = values.points;
        return newSeasonTeamPlayerStats;
    }

    toDbValues(): any {
        return {
            id: this.id,
            season_id: this.season_id,
            team_id: this.team_id,
            player_id: this.player_id,
            games: this.games,
            minutes_played: this.minutes_played,
            field_goals: this.field_goals,
            field_goal_attempts: this.field_goal_attempts,
            field_goal_percentage: this.field_goal_percentage,
            three_point_field_goals: this.three_point_field_goals,
            three_point_field_goal_attemps: this.three_point_field_goal_attemps,
            three_point_field_goal_percentage: this.three_point_field_goal_percentage,
            two_point_field_goals: this.two_point_field_goals,
            two_point_field_goal_attempts: this.two_point_field_goal_attempts,
            two_point_field_goal_percentage: this.two_point_field_goal_percentage,
            effective_field_goal_percentage: this.effective_field_goal_percentage,
            free_throws: this.free_throws,
            free_throw_attempts: this.free_throw_attempts,
            free_throw_percentage: this.free_throw_percentage,
            offensive_rebounds: this.offensive_rebounds,
            difensive_rebounds: this.difensive_rebounds,
            total_rebounds: this.total_rebounds,
            assists: this.assists,
            steals: this.steals,
            blocks: this.blocks,
            turnovers: this.turnovers,
            personal_fouls: this.personal_fouls,
            points: this.points,
        }
    }

}

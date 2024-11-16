import { DbUtils } from '../../../utils/db-utils';
import { Table } from '../Table';

export class VSeasonTeamPlayerStats implements Table {

    id: number | undefined;
    season_id: number | undefined;
    team_id: number | undefined;
    player_id: number | undefined;
    games: number | undefined;
    minutes_played: number | undefined;
    field_goals: number | undefined;
    field_goal_attempts: number | undefined;
    field_goal_percentage: number | undefined;
    three_point_field_goals: number | undefined;
    three_point_field_goal_attempts: number | undefined;
    three_point_field_goal_percentage: number | undefined;
    two_point_field_goals: number | undefined;
    two_point_field_goal_attempts: number | undefined;
    two_point_field_goal_percentage: number | undefined;
    effective_field_goal_percentage: number | undefined;
    free_throws: number | undefined;
    free_throw_attempts: number | undefined;
    free_throw_percentage: number | undefined;
    offensive_rebounds: number | undefined;
    difensive_rebounds: number | undefined;
    total_rebounds: number | undefined;
    assists: number | undefined;
    steals: number | undefined;
    blocks: number | undefined;
    turnovers: number | undefined;
    personal_fouls: number | undefined;
    points: number | undefined;
    season_name: string | undefined;
    team_name: string | undefined;
    player_name: string | undefined;

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
            this.three_point_field_goal_attempts = values.three_point_field_goal_attempts;
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
            this.season_name = values.season_name;
            this.team_name = values.team_name;
            this.player_name = values.player_name;
        }
    }

    getName(): string {
        return 'v_season_team_player_stats';
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
            'three_point_field_goal_attempts',
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
            'season_name',
            'team_name',
            'player_name',
        ];
    }

    fromDbValues(values: any): VSeasonTeamPlayerStats {
        const newVSeasonTeamPlayerStats = new VSeasonTeamPlayerStats();
        newVSeasonTeamPlayerStats.id = DbUtils.stringToNumber(values.id);
        newVSeasonTeamPlayerStats.season_id = DbUtils.stringToNumber(values.season_id);
        newVSeasonTeamPlayerStats.team_id = DbUtils.stringToNumber(values.team_id);
        newVSeasonTeamPlayerStats.player_id = DbUtils.stringToNumber(values.player_id);
        newVSeasonTeamPlayerStats.games = DbUtils.stringToNumber(values.games);
        newVSeasonTeamPlayerStats.minutes_played = DbUtils.stringToNumber(values.minutes_played);
        newVSeasonTeamPlayerStats.field_goals = DbUtils.stringToNumber(values.field_goals);
        newVSeasonTeamPlayerStats.field_goal_attempts = DbUtils.stringToNumber(values.field_goal_attempts);
        newVSeasonTeamPlayerStats.field_goal_percentage = DbUtils.stringToNumber(values.field_goal_percentage);
        newVSeasonTeamPlayerStats.three_point_field_goals = DbUtils.stringToNumber(values.three_point_field_goals);
        newVSeasonTeamPlayerStats.three_point_field_goal_attempts = DbUtils.stringToNumber(values.three_point_field_goal_attempts);
        newVSeasonTeamPlayerStats.three_point_field_goal_percentage = DbUtils.stringToNumber(values.three_point_field_goal_percentage);
        newVSeasonTeamPlayerStats.two_point_field_goals = DbUtils.stringToNumber(values.two_point_field_goals);
        newVSeasonTeamPlayerStats.two_point_field_goal_attempts = DbUtils.stringToNumber(values.two_point_field_goal_attempts);
        newVSeasonTeamPlayerStats.two_point_field_goal_percentage = DbUtils.stringToNumber(values.two_point_field_goal_percentage);
        newVSeasonTeamPlayerStats.effective_field_goal_percentage = DbUtils.stringToNumber(values.effective_field_goal_percentage);
        newVSeasonTeamPlayerStats.free_throws = DbUtils.stringToNumber(values.free_throws);
        newVSeasonTeamPlayerStats.free_throw_attempts = DbUtils.stringToNumber(values.free_throw_attempts);
        newVSeasonTeamPlayerStats.free_throw_percentage = DbUtils.stringToNumber(values.free_throw_percentage);
        newVSeasonTeamPlayerStats.offensive_rebounds = DbUtils.stringToNumber(values.offensive_rebounds);
        newVSeasonTeamPlayerStats.difensive_rebounds = DbUtils.stringToNumber(values.difensive_rebounds);
        newVSeasonTeamPlayerStats.total_rebounds = DbUtils.stringToNumber(values.total_rebounds);
        newVSeasonTeamPlayerStats.assists = DbUtils.stringToNumber(values.assists);
        newVSeasonTeamPlayerStats.steals = DbUtils.stringToNumber(values.steals);
        newVSeasonTeamPlayerStats.blocks = DbUtils.stringToNumber(values.blocks);
        newVSeasonTeamPlayerStats.turnovers = DbUtils.stringToNumber(values.turnovers);
        newVSeasonTeamPlayerStats.personal_fouls = DbUtils.stringToNumber(values.personal_fouls);
        newVSeasonTeamPlayerStats.points = DbUtils.stringToNumber(values.points);
        newVSeasonTeamPlayerStats.season_name = values.season_name;
        newVSeasonTeamPlayerStats.team_name = values.team_name;
        newVSeasonTeamPlayerStats.player_name = values.player_name;
        return newVSeasonTeamPlayerStats;
    }

    toDbValues(): any {
        return {
            id: DbUtils.numberToString(this.id),
            season_id: DbUtils.numberToString(this.season_id),
            team_id: DbUtils.numberToString(this.team_id),
            player_id: DbUtils.numberToString(this.player_id),
            games: DbUtils.numberToString(this.games),
            minutes_played: DbUtils.numberToString(this.minutes_played),
            field_goals: DbUtils.numberToString(this.field_goals),
            field_goal_attempts: DbUtils.numberToString(this.field_goal_attempts),
            field_goal_percentage: DbUtils.numberToString(this.field_goal_percentage),
            three_point_field_goals: DbUtils.numberToString(this.three_point_field_goals),
            three_point_field_goal_attempts: DbUtils.numberToString(this.three_point_field_goal_attempts),
            three_point_field_goal_percentage: DbUtils.numberToString(this.three_point_field_goal_percentage),
            two_point_field_goals: DbUtils.numberToString(this.two_point_field_goals),
            two_point_field_goal_attempts: DbUtils.numberToString(this.two_point_field_goal_attempts),
            two_point_field_goal_percentage: DbUtils.numberToString(this.two_point_field_goal_percentage),
            effective_field_goal_percentage: DbUtils.numberToString(this.effective_field_goal_percentage),
            free_throws: DbUtils.numberToString(this.free_throws),
            free_throw_attempts: DbUtils.numberToString(this.free_throw_attempts),
            free_throw_percentage: DbUtils.numberToString(this.free_throw_percentage),
            offensive_rebounds: DbUtils.numberToString(this.offensive_rebounds),
            difensive_rebounds: DbUtils.numberToString(this.difensive_rebounds),
            total_rebounds: DbUtils.numberToString(this.total_rebounds),
            assists: DbUtils.numberToString(this.assists),
            steals: DbUtils.numberToString(this.steals),
            blocks: DbUtils.numberToString(this.blocks),
            turnovers: DbUtils.numberToString(this.turnovers),
            personal_fouls: DbUtils.numberToString(this.personal_fouls),
            points: DbUtils.numberToString(this.points),
            season_name: this.season_name,
            team_name: this.team_name,
            player_name: this.player_name,
        }
    }

}

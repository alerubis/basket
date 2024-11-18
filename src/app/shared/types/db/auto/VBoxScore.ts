import { DbUtils } from '../../../utils/db-utils';
import { Table } from '../Table';

export class VBoxScore implements Table {

    id: number | undefined;
    game_id: number | undefined;
    player: string | undefined;
    assists: number | undefined;
    rebounds: number | undefined;
    steals: number | undefined;
    points: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.game_id = values.game_id;
            this.player = values.player;
            this.assists = values.assists;
            this.rebounds = values.rebounds;
            this.steals = values.steals;
            this.points = values.points;
        }
    }

    getName(): string {
        return 'v_box_score';
    }

    getFields(): string[] {
        return [
            'id',
            'game_id',
            'player',
            'assists',
            'rebounds',
            'steals',
            'points',
        ];
    }

    fromDbValues(values: any): VBoxScore {
        const newVBoxScore = new VBoxScore();
        newVBoxScore.id = DbUtils.stringToNumber(values.id);
        newVBoxScore.game_id = DbUtils.stringToNumber(values.game_id);
        newVBoxScore.player = values.player;
        newVBoxScore.assists = DbUtils.stringToNumber(values.assists);
        newVBoxScore.rebounds = DbUtils.stringToNumber(values.rebounds);
        newVBoxScore.steals = DbUtils.stringToNumber(values.steals);
        newVBoxScore.points = DbUtils.stringToNumber(values.points);
        return newVBoxScore;
    }

    toDbValues(): any {
        return {
            id: DbUtils.numberToString(this.id),
            game_id: DbUtils.numberToString(this.game_id),
            player: this.player,
            assists: DbUtils.numberToString(this.assists),
            rebounds: DbUtils.numberToString(this.rebounds),
            steals: DbUtils.numberToString(this.steals),
            points: DbUtils.numberToString(this.points),
        }
    }

}

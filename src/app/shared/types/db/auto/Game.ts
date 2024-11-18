import { DbUtils } from '../../../utils/db-utils';
import { Table } from '../Table';

export class Game implements Table {

    id: number | undefined;
    home_team: string | undefined;
    visitor_team: string | undefined;
    date: Date | undefined;
    home_points: number | undefined;
    visitor_points: number | undefined;
    youtube_video_id: string | undefined;
    youtube_game_id: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.home_team = values.home_team;
            this.visitor_team = values.visitor_team;
            this.date = values.date;
            this.home_points = values.home_points;
            this.visitor_points = values.visitor_points;
            this.youtube_video_id = values.youtube_video_id;
            this.youtube_game_id = values.youtube_game_id;
        }
    }

    getName(): string {
        return 'game';
    }

    getFields(): string[] {
        return [
            'id',
            'home_team',
            'visitor_team',
            'date',
            'home_points',
            'visitor_points',
            'youtube_video_id',
            'youtube_game_id',
        ];
    }

    fromDbValues(values: any): Game {
        const newGame = new Game();
        newGame.id = DbUtils.stringToNumber(values.id);
        newGame.home_team = values.home_team;
        newGame.visitor_team = values.visitor_team;
        newGame.date = DbUtils.epochToDate(values.date);
        newGame.home_points = DbUtils.stringToNumber(values.home_points);
        newGame.visitor_points = DbUtils.stringToNumber(values.visitor_points);
        newGame.youtube_video_id = values.youtube_video_id;
        newGame.youtube_game_id = values.youtube_game_id;
        return newGame;
    }

    toDbValues(): any {
        return {
            id: DbUtils.numberToString(this.id),
            home_team: this.home_team,
            visitor_team: this.visitor_team,
            date: DbUtils.dateToEpoch(this.date),
            home_points: DbUtils.numberToString(this.home_points),
            visitor_points: DbUtils.numberToString(this.visitor_points),
            youtube_video_id: this.youtube_video_id,
            youtube_game_id: this.youtube_game_id,
        }
    }

}

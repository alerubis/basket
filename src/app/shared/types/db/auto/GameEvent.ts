import { DbUtils } from '../../../utils/db-utils';
import { Table } from '../Table';

export class GameEvent implements Table {

    id: number | undefined;
    game_id: number | undefined;
    game_event_type_id: number | undefined;
    home: any | undefined;
    giocatore_1: string | undefined;
    giocatore_2: string | undefined;
    x: number | undefined;
    y: number | undefined;
    made: any | undefined;
    from_second: number | undefined;
    to_second: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.game_id = values.game_id;
            this.game_event_type_id = values.game_event_type_id;
            this.home = values.home;
            this.giocatore_1 = values.giocatore_1;
            this.giocatore_2 = values.giocatore_2;
            this.x = values.x;
            this.y = values.y;
            this.made = values.made;
            this.from_second = values.from_second;
            this.to_second = values.to_second;
        }
    }

    getName(): string {
        return 'game_event';
    }

    getFields(): string[] {
        return [
            'id',
            'game_id',
            'game_event_type_id',
            'home',
            'giocatore_1',
            'giocatore_2',
            'x',
            'y',
            'made',
            'from_second',
            'to_second',
        ];
    }

    fromDbValues(values: any): GameEvent {
        const newGameEvent = new GameEvent();
        newGameEvent.id = DbUtils.stringToNumber(values.id);
        newGameEvent.game_id = DbUtils.stringToNumber(values.game_id);
        newGameEvent.game_event_type_id = DbUtils.stringToNumber(values.game_event_type_id);
        newGameEvent.home = values.home;
        newGameEvent.giocatore_1 = values.giocatore_1;
        newGameEvent.giocatore_2 = values.giocatore_2;
        newGameEvent.x = DbUtils.stringToNumber(values.x);
        newGameEvent.y = DbUtils.stringToNumber(values.y);
        newGameEvent.made = values.made;
        newGameEvent.from_second = DbUtils.stringToNumber(values.from_second);
        newGameEvent.to_second = DbUtils.stringToNumber(values.to_second);
        return newGameEvent;
    }

    toDbValues(): any {
        return {
            id: DbUtils.numberToString(this.id),
            game_id: DbUtils.numberToString(this.game_id),
            game_event_type_id: DbUtils.numberToString(this.game_event_type_id),
            home: this.home,
            giocatore_1: this.giocatore_1,
            giocatore_2: this.giocatore_2,
            x: DbUtils.numberToString(this.x),
            y: DbUtils.numberToString(this.y),
            made: this.made,
            from_second: DbUtils.numberToString(this.from_second),
            to_second: DbUtils.numberToString(this.to_second),
        }
    }

}

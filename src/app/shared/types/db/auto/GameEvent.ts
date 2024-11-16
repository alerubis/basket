import { DbUtils } from '../../../utils/db-utils';
import { Table } from '../Table';

export class GameEvent implements Table {

    id: number | undefined;
    game_id: number | undefined;
    game_event_type_id: number | undefined;
    description: string | undefined;
    from_time: number | undefined;
    to_time: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.game_id = values.game_id;
            this.game_event_type_id = values.game_event_type_id;
            this.description = values.description;
            this.from_time = values.from_time;
            this.to_time = values.to_time;
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
            'description',
            'from_time',
            'to_time',
        ];
    }

    fromDbValues(values: any): GameEvent {
        const newGameEvent = new GameEvent();
        newGameEvent.id = DbUtils.stringToNumber(values.id);
        newGameEvent.game_id = DbUtils.stringToNumber(values.game_id);
        newGameEvent.game_event_type_id = DbUtils.stringToNumber(values.game_event_type_id);
        newGameEvent.description = values.description;
        newGameEvent.from_time = DbUtils.stringToNumber(values.from_time);
        newGameEvent.to_time = DbUtils.stringToNumber(values.to_time);
        return newGameEvent;
    }

    toDbValues(): any {
        return {
            id: DbUtils.numberToString(this.id),
            game_id: DbUtils.numberToString(this.game_id),
            game_event_type_id: DbUtils.numberToString(this.game_event_type_id),
            description: this.description,
            from_time: DbUtils.numberToString(this.from_time),
            to_time: DbUtils.numberToString(this.to_time),
        }
    }

}

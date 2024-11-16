import { DbUtils } from '../../../utils/db-utils';
import { Table } from '../Table';

export class GameEventType implements Table {

    id: number | undefined;
    description: string | undefined;
    icon: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.description = values.description;
            this.icon = values.icon;
        }
    }

    getName(): string {
        return 'game_event_type';
    }

    getFields(): string[] {
        return [
            'id',
            'description',
            'icon',
        ];
    }

    fromDbValues(values: any): GameEventType {
        const newGameEventType = new GameEventType();
        newGameEventType.id = DbUtils.stringToNumber(values.id);
        newGameEventType.description = values.description;
        newGameEventType.icon = values.icon;
        return newGameEventType;
    }

    toDbValues(): any {
        return {
            id: DbUtils.numberToString(this.id),
            description: this.description,
            icon: this.icon,
        }
    }

}

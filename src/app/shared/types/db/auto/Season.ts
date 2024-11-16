import { DbUtils } from '../../../utils/db-utils';
import { Table } from '../Table';

export class Season implements Table {

    id: number | undefined;
    name: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.name = values.name;
        }
    }

    getName(): string {
        return 'season';
    }

    getFields(): string[] {
        return [
            'id',
            'name',
        ];
    }

    fromDbValues(values: any): Season {
        const newSeason = new Season();
        newSeason.id = DbUtils.stringToNumber(values.id);
        newSeason.name = values.name;
        return newSeason;
    }

    toDbValues(): any {
        return {
            id: DbUtils.numberToString(this.id),
            name: this.name,
        }
    }

}

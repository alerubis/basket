import { DbUtils } from '../../../utils/db-utils';
import { Table } from '../Table';

export class Team implements Table {

    id: number | undefined;
    name: string | undefined;
    image: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.name = values.name;
            this.image = values.image;
        }
    }

    getName(): string {
        return 'team';
    }

    getFields(): string[] {
        return [
            'id',
            'name',
            'image',
        ];
    }

    fromDbValues(values: any): Team {
        const newTeam = new Team();
        newTeam.id = DbUtils.stringToNumber(values.id);
        newTeam.name = values.name;
        newTeam.image = values.image;
        return newTeam;
    }

    toDbValues(): any {
        return {
            id: DbUtils.numberToString(this.id),
            name: this.name,
            image: this.image,
        }
    }

}

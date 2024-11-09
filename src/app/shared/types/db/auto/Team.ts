import { DbUtils } from '../../../utils/db-utils';
import { Table } from '../Table';

export class Team implements Table {

    id: number | undefined;
    name: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.name = values.name;
        }
    }

    getName(): string {
        return 'team';
    }

    getFields(): string[] {
        return [
            'id',
            'name',
        ];
    }

    fromDbValues(values: any): Team {
        const newTeam = new Team();
        newTeam.id = values.id;
        newTeam.name = values.name;
        return newTeam;
    }

    toDbValues(): any {
        return {
            id: this.id,
            name: this.name,
        }
    }

}

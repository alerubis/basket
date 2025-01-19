import { DbUtils } from '../../../utils/db-utils';
import { Table } from '../Table';

export class Player implements Table {

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
        return 'player';
    }

    getFields(): string[] {
        return [
            'id',
            'name',
            'image',
        ];
    }

    fromDbValues(values: any): Player {
        const newPlayer = new Player();
        newPlayer.id = DbUtils.stringToNumber(values.id);
        newPlayer.name = values.name;
        newPlayer.image = values.image;
        return newPlayer;
    }

    toDbValues(): any {
        return {
            id: DbUtils.numberToString(this.id),
            name: this.name,
            image: this.image,
        }
    }

}

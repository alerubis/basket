export interface Table {

    id: number | undefined;

    getName(): string;
    getFields(): string[];
    fromDbValues(values: any): Table;
    toDbValues(): any;

    [key: string]: any;

}

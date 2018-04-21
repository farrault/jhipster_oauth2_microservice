export interface IAuthor {
    id?: number;
    name?: string;
    age?: number;
}

export class Author implements IAuthor {
    constructor(public id?: number, public name?: string, public age?: number) {}
}

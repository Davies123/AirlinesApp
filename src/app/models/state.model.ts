import { Country } from './country.model';

export class State {
    constructor(
        public ID: number, 
        public Name: string,
        public CountryID: number,
        public Country: Country
        ){}
}
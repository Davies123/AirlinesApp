import { Country } from './country.model';
import { State } from './state.model';
import { CompanyType } from './company-type.model';

export class Company {
    constructor(
        public ID: number, 
        public Name: string,
        public Description: string,
        public CountryID: number,
        public StateID: number,
        public CompanyTypeID: number,
        public Logo: string,
        public Country: Country,
        public State: State,
        public CompanyType: CompanyType
        ){}
}
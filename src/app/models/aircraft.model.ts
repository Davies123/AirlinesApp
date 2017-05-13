
import { Company } from './company.model';

export class Aircraft {
    constructor(
        public ID: number, 
        public Name: string,
        public Description: string,
        public Capacity: number,
        public CompanyID: number,
        public Airplane: string,
        public Company: Company
        ){}
}
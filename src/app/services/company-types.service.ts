import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CompanyType } from '../models/company-type.model';

@Injectable()
export class CompanyTypesService {
     
    constructor (private http: Http) {}
     
    private companyTypessUrl = 'http://localhost/AirlineWebApi/api/companytypes'; 

    getCompanyTypes() : Observable<CompanyType[]> {              
        return this.http.get(this.companyTypessUrl)                        
                        .map((res:Response) => res.json())                 
                        .catch((error:any) => Observable.throw(error.json().error || error));                        
     }   

    addCompanyType (body: Object): Observable<CompanyType> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.companyTypessUrl, body, options)
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }      

    getCompanyType (id: string) : Observable<CompanyType> {
        return this.http.get(`${this.companyTypessUrl}/${id}`)                        
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || error));

     }  

    updateCompanyType (body: Object): Observable<CompanyType> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`${this.companyTypessUrl}/${body['ID']}`, body, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }  

    removeCompanyType (id:string): Observable<CompanyType> {
        return this.http.delete(`${this.companyTypessUrl}/${id}`)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));                       
    }  

}
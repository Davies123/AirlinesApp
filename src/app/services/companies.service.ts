import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Company } from '../models/company.model';



@Injectable()
export class CompaniesService {
     
    constructor (private http: Http) {}
     
    private companiesUrl = 'http://localhost/AirlineWebApi/api/companies'; 

    getCompanies(typeId: string) : Observable<Company[]> {              
        return this.http.get(`${this.companiesUrl}/${typeId}`)                        
                        .map((res:Response) => res.json())                 
                        .catch((error:any) => Observable.throw(error.json().error || error));                        
     }   

    addCompany (body: Object): Observable<Company> {

        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });        
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(this.companiesUrl, body, options)
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }      

    getCompany (id: string) : Observable<Company> {
        return this.http.get(`${this.companiesUrl}/details/${id}`)                        
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || error));

     }  

    updateCompany (body: Object): Observable<Company> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`${this.companiesUrl}/update/`, body, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }  

    removeCompany (id:string): Observable<Company> {
        return this.http.delete(`${this.companiesUrl}/delete/${id}`)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));                       
    }  

}
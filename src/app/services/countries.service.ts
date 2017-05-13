import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Country } from '../models/country.model';

@Injectable()
export class CountriesService {
     
    constructor (private http: Http) {}
     
    private countriesUrl = 'http://localhost/AirlineWebApi/api/countries'; 

    getCountries() : Observable<Country[]> {              
        return this.http.get(this.countriesUrl)                        
                        .map((res:Response) => res.json())                 
                        .catch((error:any) => Observable.throw(error.json().error || error));                        
    }   
    
    addCountry (body: Object): Observable<Country> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.countriesUrl, body, options)
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }      

    getCountry (id: string) : Observable<Country> {
        return this.http.get(`${this.countriesUrl}/${id}`)                        
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || error));

     }  

    updateCountry (body: Object): Observable<Country> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`${this.countriesUrl}/${body['ID']}`, body, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }  

    removeCountry (id:string): Observable<Country> {
        return this.http.delete(`${this.countriesUrl}/${id}`)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));                       
    }  

}
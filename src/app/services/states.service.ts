import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { State } from '../models/state.model';


@Injectable()
export class StatesService {
     
    constructor (private http: Http) {}
     
    private statesUrl = 'http://localhost/AirlineWebApi/api/states'; 

    getStates() : Observable<State[]> {              
        return this.http.get(this.statesUrl)                        
                        .map((res:Response) => res.json())                 
                        .catch((error:any) => Observable.throw(error.json().error || error));                        
     }   

    addState (body: Object): Observable<State> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.statesUrl, body, options)
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }      

    getState (id: string) : Observable<State> {
        return this.http.get(`${this.statesUrl}/${id}`)                        
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || error));

     }  

    updateState (body: Object): Observable<State> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`${this.statesUrl}/${body['ID']}`, body, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }  

    removeState (id:string): Observable<State> {
        return this.http.delete(`${this.statesUrl}/${id}`)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));                       
    }  

}
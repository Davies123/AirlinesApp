import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Aircraft } from '../models/aircraft.model';


@Injectable()
export class AircraftsService {
     
    constructor (private http: Http) {}
     
    private aircraftUrl = 'http://localhost/AirlineWebApi/api/aircraft'; 

    getAircrafts() : Observable<Aircraft[]> {              
        return this.http.get(this.aircraftUrl)                        
                        .map((res:Response) => res.json())                 
                        .catch((error:any) => Observable.throw(error.json().error || error));                        
     }   

    addAircraft (body: Object): Observable<Aircraft> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.aircraftUrl, body, options)
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }      

    getAircraft (id: string) : Observable<Aircraft> {
        return this.http.get(`${this.aircraftUrl}/${id}`)                        
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || error));

     }  

    updateAircraft (body: Object): Observable<Aircraft> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`${this.aircraftUrl}/${body['ID']}`, body, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }  

    removeAircraft (id:string): Observable<Aircraft> {
        return this.http.delete(`${this.aircraftUrl}/${id}`)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));                       
    }  

}
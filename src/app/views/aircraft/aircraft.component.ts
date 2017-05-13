import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

import { Action } from '../../models/enum.model';
import { Aircraft } from '../../models/aircraft.model';
import { AircraftsService } from '../../services/aircrafts.service';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})
export class AircraftComponent implements OnInit {

  Action = Action;

  private aircrafts: Aircraft[];
  private aircraftsOperation:Observable<Aircraft[]>;
  private err: string;

  constructor(private aircraftsService: AircraftsService, private router: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit() {    
    this.loadAircraft();
  }

  loadAircraft() {
  
    this.aircraftsOperation = this.aircraftsService.getAircrafts();

    this.aircraftsOperation.subscribe(
                                aircrafts => this.aircrafts = aircrafts,
                                err => this.err = err);    

  }

  editAircraft(action:string, id:string) {
    this.router.navigate([`/aircrafts/details/${action}/${id}`]);
  }

  displayImage(data: string) : SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image; base64,' + data);
  }  

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EnumComponent, Action } from '../../../models/enum.model';
import { Aircraft } from '../../../models/aircraft.model';
import { Company } from '../../../models/company.model';
import { AircraftsService } from '../../../services/aircrafts.service';
import { CompaniesService } from '../../../services/companies.service';

@Component({
  selector: 'app-aircraft-details',
  templateUrl: './aircraft-details.component.html',
  styleUrls: ['./aircraft-details.component.css']
})
export class AircraftDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

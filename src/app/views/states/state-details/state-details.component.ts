import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EnumComponent, Action } from '../../../models/enum.model';
import { State } from '../../../models/state.model';
import { Country } from '../../../models/country.model';
import { StatesService } from '../../../services/states.service';
import { CountriesService } from '../../../services/countries.service';

@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.css']
})
export class StateDetailsComponent implements OnInit {

  Action = Action;

  private state = new State(0, '', 0, new Country(0, ''));
  private countries: Country[];
  private stateOperation:Observable<State>;
  private countriesOperation:Observable<Country[]>;
  private err: string;
  private editId: string;
  private action: string;
  private title: string;

  constructor(private statesService: StatesService, private countriesService: CountriesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.editId = this.route.snapshot.params['id'];
    this.action = this.route.snapshot.params['action'];

    this.setTitle();

    if (this.editId != "0")
      this.loadState();

    this.loadCountries();

  }

  loadState() {

    this.stateOperation = this.statesService.getState(this.editId);

    this.stateOperation.subscribe(
                              state => this.state = state,
                              err => {
                                  console.log(err);
                              });
  }

  loadCountries() {
  
    this.countriesOperation = this.countriesService.getCountries();

    this.countriesOperation.subscribe(
                              countries => this.countries = countries,
                              err => this.err = err);    

  }
  
  submiState() {

    this.state.Country = this.countries.find(c => c.ID === this.state.CountryID);

    switch (this.action) {

      case Action[Action.New]:        
        this.stateOperation = this.statesService.addState(this.state);
        break;

      case Action[Action.Edit]:
        this.stateOperation = this.statesService.updateState(this.state);
        break;

      case Action[Action.Delete]:
        this.stateOperation = this.statesService.removeState(this.editId);
        break; 
    }

    this.stateOperation.subscribe(
                              () => this.router.navigate(['/states']),
                              err => {
                                  console.log(err);
                              });

  }

  setTitle() {

    switch (this.action) {

      case Action[Action.New]:
        this.title = 'Create New State';
        break;

      case Action[Action.Edit]:
        this.title = 'Edit State';
        break;

      case Action[Action.Detail]:
        this.title = 'State Details';
        break;

      case Action[Action.Delete]:
        this.title = 'Do you wish to delete this state?';
        break;                        
    }

  }

  backToList() {
    this.router.navigate(['/states']);
  }

  editDetail() {
    this.action = Action[Action.Edit];
  }

}

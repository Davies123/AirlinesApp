import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Action } from '../../models/enum.model';
import { State } from '../../models/state.model';
import { StatesService } from '../../services/states.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

  Action = Action;

  private states: State[];
  private statesOperation:Observable<State[]>;
  private err: string;

  constructor(private statesService: StatesService, private router: Router) { }

  ngOnInit() {    
    this.loadStates();
  }

  loadStates() {
  
    this.statesOperation = this.statesService.getStates();

    this.statesOperation.subscribe(
                              states => this.states = states,
                              err => this.err = err);    

  }

  editState(action:string, id:string) {

    this.router.navigate([`/states/details/${action}/${id}`]);

  }

}

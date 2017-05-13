import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EnumComponent, Action } from '../../../models/enum.model';
import { Country } from '../../../models/country.model';
import { CountriesService } from '../../../services/countries.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})

export class CountryDetailsComponent implements OnInit {

  Action = Action;

  private country = new Country(0, '');
  private countryOperation:Observable<Country>;
  private err: string;
  private editId: string;
  private action: string;
  private title: string;

  constructor(private countriesService: CountriesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.editId = this.route.snapshot.params['id'];
    this.action = this.route.snapshot.params['action'];

    this.setTitle();

    if (this.editId != "0")
      this.loadCountry();

  }

  loadCountry() {

    this.countryOperation = this.countriesService.getCountry(this.editId);

    this.countryOperation.subscribe(
                              country => this.country = country,
                              err => {
                                  console.log(err);
                              });
  }

  submitCountry() {

    switch (this.action) {

      case Action[Action.New]:
        this.countryOperation = this.countriesService.addCountry(this.country);
        break;

      case Action[Action.Edit]:
        this.countryOperation = this.countriesService.updateCountry(this.country);
        break;

      case Action[Action.Delete]:
        this.countryOperation = this.countriesService.removeCountry(this.editId);
        break; 
    }

    this.countryOperation.subscribe(
                              () => this.router.navigate(['/countries']),
                              err => {
                                  console.log(err);
                              });

  }

  setTitle() {

    switch (this.action) {

      case Action[Action.New]:
        this.title = 'Create New Country';
        break;

      case Action[Action.Edit]:
        this.title = 'Edit Country';
        break;

      case Action[Action.Detail]:
        this.title = 'Country Details';
        break;

      case Action[Action.Delete]:
        this.title = 'Do you wish to delete this country?';
        break;                        
    }

  }

  backToList() {
    this.router.navigate(['/countries']);
  }

  editDetail() {
    this.action = Action[Action.Edit];
  }

}

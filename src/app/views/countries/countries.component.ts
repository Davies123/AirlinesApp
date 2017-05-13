import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Action } from '../../models/enum.model';
import { Country } from '../../models/country.model';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})

export class CountriesComponent implements OnInit {

  Action = Action;

  private countries: Country[];
  private countriesOperation:Observable<Country[]>;
  private err: string;

  constructor(private countriesService: CountriesService, private router: Router) { }

  ngOnInit() {    
    this.loadCountries();
  }

  loadCountries() {
  
    this.countriesOperation = this.countriesService.getCountries();

    this.countriesOperation.subscribe(
                              countries => this.countries = countries,
                              err => this.err = err);    

  }

  editCountry(action:string, id:string) {

    this.router.navigate([`/countries/details/${action}/${id}`]);

  }

}

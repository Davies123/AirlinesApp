import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

import { EnumComponent, Action, CompanyTypeEnum } from '../../../models/enum.model';
import { State } from '../../../models/state.model';
import { Country } from '../../../models/country.model';
import { CompanyType } from '../../../models/company-type.model';
import { Company } from '../../../models/company.model';

import { StatesService } from '../../../services/states.service';
import { CountriesService } from '../../../services/countries.service';
import { CompanyTypesService } from '../../../services/company-types.service';
import { CompaniesService } from '../../../services/companies.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})

export class CompanyDetailComponent implements OnInit {

  Action = Action;
  CompanyTypeEnum = CompanyTypeEnum;

  private companyType = new CompanyType(0, '')
  private country = new Country(0, '');
  private state = new State(0, '', 0, this.country);
  private company = new Company(0, '', '', 0, 0, 0, '', this.country, this.state, this.companyType);

  private countries: Country[];
  private states: State[];
  private statesFilter: State[];
  private companyTypes: CompanyType[];

  private statesOperation:Observable<State[]>;
  private countriesOperation:Observable<Country[]>;
  private companyTypesOperation:Observable<CompanyType[]>;
  private companyOperation:Observable<Company>;

  private title: string;
  private err: string;

  private editId: string;
  private action: string;
  private typeId: string;

  private file: File;

  constructor(private statesService: StatesService, 
              private countriesService: CountriesService, 
              private companyTypesService: CompanyTypesService, 
              private companiesService: CompaniesService,
              private router: Router, 
              private route: ActivatedRoute,
              private domSanitizer: DomSanitizer) { }

  ngOnInit() {

    this.editId = this.route.snapshot.params['id'];
    this.action = this.route.snapshot.params['action'];
    this.typeId = this.route.snapshot.params['typeId'];
        
    this.setTitle();

    this.loadCountries();
    this.loadCompanyTypes();
    this.loadStates();

    if (this.editId != "0")
      this.loadCompany();
      
  }

  loadCompany() {

    this.companyOperation = this.companiesService.getCompany(this.editId);

    this.companyOperation.subscribe(
                              company => this.company = company,
                              err => {
                                  console.log(err);
                              });   

    this.companyOperation.subscribe(() => this.countryChange(this.company.CountryID));

  }

  loadCountries() {
  
    this.countriesOperation = this.countriesService.getCountries();

    this.countriesOperation.subscribe(
                                countries => this.countries = countries,
                                err => this.err = err);
  }
  
  loadCompanyTypes() {
  
    this.companyTypesOperation = this.companyTypesService.getCompanyTypes();

    this.companyTypesOperation.subscribe(
                                    companyTypes => this.companyTypes = companyTypes,
                                    err => this.err = err);                                    

  }

  loadStates() {
  
    this.statesOperation = this.statesService.getStates();

    this.statesOperation.subscribe(
                              states => this.states = states,
                              err => this.err = err);    

  }

  submitCompany() {
        
    this.country = this.countries.find(c => c.ID === this.company.CountryID);
    this.companyType = this.companyTypes.find(c => c.ID === this.company.CompanyTypeID);
    this.state = this.states.find(s => s.ID === this.company.StateID);
    
    this.company.State = this.state;    
    this.company.Country = this.country;
    this.company.CompanyType = this.companyType;

    this.company.CompanyTypeID = CompanyTypeEnum[this.typeId];

    switch (this.action) {

      case Action[Action.New]:        
        this.companyOperation = this.companiesService.addCompany(this.company);
        break;

      case Action[Action.Edit]:
        this.companyOperation = this.companiesService.updateCompany(this.company);
        break;

      case Action[Action.Delete]:
        this.companyOperation = this.companiesService.removeCompany(this.editId);
        break; 
    }

    this.companyOperation.subscribe(
                              () => this.router.navigate([`/companies/${this.typeId}`]),
                              err => {
                                  console.log(err);
                              });

  }

  setTitle() {

    switch (this.action) {

      case Action[Action.New]:
        this.title = `Create New ${this.typeId}`;
        break;

      case Action[Action.Edit]:
        this.title = `Edit ${this.typeId}`;
        break;

      case Action[Action.Detail]:
        this.title = `${this.typeId} Details`;
        break;

      case Action[Action.Delete]:
        this.title = `Do you wish to delete this ${this.typeId}?`;
        break;             

    }

  }

  countryChange(countryId) {    
    this.statesFilter = this.states.filter(s => s.CountryID === +countryId);
  }

  fileChange(event) {

    this.file = event.target.files[0];

    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {      
      this.company.Logo = myReader.result.slice(myReader.result.indexOf('base64,') + 7);;
    }

    myReader.readAsDataURL(this.file);

  }

  backToList() {
    this.router.navigate([`/companies/${this.typeId}`]);
  }

  editDetail() {
    this.action = Action[Action.Edit];   
  }

  displayImage(data: string) : SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image; base64,' + data);
  }

}

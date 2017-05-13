import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CompaniesComponent } from './views/companies/companies.component';
import { CountriesComponent } from './views/countries/countries.component';
import { StatesComponent } from './views/states/states.component';
import { CompanyTypesComponent } from './views/company-types/company-types.component';
import { AircraftComponent } from './views/aircraft/aircraft.component';
import { CountryDetailsComponent } from './views/countries/country-details/country-details.component';
import { CompanyTypeDetailsComponent } from './views/company-types/company-type-details/company-type-details.component';
import { StateDetailsComponent } from './views/states/state-details/state-details.component';
import { CompanyDetailComponent } from './views/companies/company-detail/company-detail.component';

import { CountriesService } from './services/countries.service';
import { CompanyTypesService } from './services/company-types.service';
import { StatesService } from './services/states.service';
import { CompaniesService } from './services/companies.service';
import { AircraftsService } from './services/aircrafts.service';
import { AircraftDetailsComponent } from './views/aircraft/aircraft-details/aircraft-details.component';

const appRoutes: Routes = [
  { path: 'companies', component: CompaniesComponent },
  { path: 'companies/:typeId', component: CompaniesComponent },
  { path: 'companies/details/:action/:typeId/:id', component: CompanyDetailComponent },
  { path: 'aircrafts', component: AircraftComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'states', component: StatesComponent },
  { path: 'states/details/:action/:id', component: StateDetailsComponent },
  { path: 'companytypes', component: CompanyTypesComponent },
  { path: 'countries/details/:action/:id', component: CountryDetailsComponent },
  { path: 'companytypes/details/:action/:id', component: CompanyTypeDetailsComponent }  
];

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    CountriesComponent,
    StatesComponent,
    CompanyTypesComponent,
    AircraftComponent,
    CountryDetailsComponent,
    CompanyTypeDetailsComponent,
    StateDetailsComponent,
    CompanyDetailComponent,
    AircraftDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    CountriesService, 
    CompanyTypesService,
    StatesService,
    CompaniesService,
    AircraftsService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

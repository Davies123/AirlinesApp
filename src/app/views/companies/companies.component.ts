import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

import { Action, CompanyTypeEnum } from '../../models/enum.model';
import { Company } from '../../models/company.model';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit {

  Action = Action;
  
  private companies: Company[];
  private companiesOperation:Observable<Company[]>;
  private err: string;
  private title: string;
  private typeId: string;

  constructor(private companiesService: CompaniesService, private router: Router, private route: ActivatedRoute, private domSanitizer: DomSanitizer) { }

  ngOnInit() {    
      
    this.route.params.subscribe(typeId => this.title = this.setTitle(this.route.snapshot.params['typeId']));
    this.route.params.subscribe(typeId => this.loadCompanies(this.route.snapshot.params['typeId']));
    this.route.params.subscribe(typeId => this.loadCompanies(this.route.snapshot.params['typeId']));
    this.route.params.subscribe(typeId => this.typeId = this.route.snapshot.params['typeId']);

  }

  loadCompanies(typeId: string) {
  
    this.companiesOperation = this.companiesService.getCompanies(typeId);

    this.companiesOperation.subscribe(
                                  companies => this.companies = companies,
                                  err => this.err = err);

  }

  editCompany(action:string, typeId: string, id:string) {

    this.router.navigate([`/companies/details/${action}/${typeId}/${id}`]);

  }

  setTitle(typeId: string): string {

    switch (typeId) 
    {
      case CompanyTypeEnum[CompanyTypeEnum.Airline]:
        return "Airline";

      case CompanyTypeEnum[CompanyTypeEnum.AircraftManufacturer]:
        return "Aircraft Manufacturer";        
    }
  }

  displayImage(data: string) : SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image; base64,' + data);
  }

}

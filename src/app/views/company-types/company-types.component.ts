import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Action } from '../../models/enum.model';
import { CompanyType } from '../../models/company-type.model';
import { CompanyTypesService } from '../../services/company-types.service';

@Component({
  selector: 'app-company-types',
  templateUrl: './company-types.component.html',
  styleUrls: ['./company-types.component.css']
})
export class CompanyTypesComponent implements OnInit {

  Action = Action;

  private companyTypes: CompanyType[];
  private companyTypesOperation:Observable<CompanyType[]>;
  private err: string;

  constructor(private companyTypesService: CompanyTypesService, private router: Router) { }

  ngOnInit() {    
    this.loadCompanyTypes();
  }

  loadCompanyTypes() {
  
    this.companyTypesOperation = this.companyTypesService.getCompanyTypes();

    this.companyTypesOperation.subscribe(
                                  companyTypes => this.companyTypes = companyTypes,
                                  err => this.err = err);    

  }

  editCompanyType(action:string, id:string) {

    this.router.navigate([`/companytypes/details/${action}/${id}`]);

  }

}

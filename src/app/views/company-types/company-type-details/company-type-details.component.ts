import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EnumComponent, Action } from '../../../models/enum.model';
import { CompanyType } from '../../../models/company-type.model';
import { CompanyTypesService } from '../../../services/company-types.service';

@Component({
  selector: 'app-company-type-details',
  templateUrl: './company-type-details.component.html',
  styleUrls: ['./company-type-details.component.css']
})
export class CompanyTypeDetailsComponent implements OnInit {

  Action = Action;

  private companyType = new CompanyType(0, '');
  private companyTypeOperation:Observable<CompanyType>;
  private err: string;
  private editId: string;
  private action: string;
  private title: string;

  constructor(private coumpanyTypesService: CompanyTypesService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {

    this.editId = this.route.snapshot.params['id'];
    this.action = this.route.snapshot.params['action'];

    this.setTitle();

    if (this.editId != "0")
      this.loadCompanyType();

  }

  loadCompanyType() {

    this.companyTypeOperation = this.coumpanyTypesService.getCompanyType(this.editId);

    this.companyTypeOperation.subscribe(
                                  companyType => this.companyType = companyType,
                                  err => {
                                      console.log(err);
                                  });
  }

  submitCompanyType() {

    switch (this.action) {

      case Action[Action.New]:
        this.companyTypeOperation = this.coumpanyTypesService.addCompanyType(this.companyType);
        break;

      case Action[Action.Edit]:
        this.companyTypeOperation = this.coumpanyTypesService.updateCompanyType(this.companyType);
        break;

      case Action[Action.Delete]:
        this.companyTypeOperation = this.coumpanyTypesService.removeCompanyType(this.editId);
        break; 
    }

    this.companyTypeOperation.subscribe(
                                  () => this.router.navigate(['/companytypes']),
                                  err => {
                                      console.log(err);
                                  });

  }

  setTitle() {

    switch (this.action) {

      case Action[Action.New]:
        this.title = 'Create New Company Type';
        break;

      case Action[Action.Edit]:
        this.title = 'Edit Company Type';
        break;

      case Action[Action.Detail]:
        this.title = 'Company Type Details';
        break;

      case Action[Action.Delete]:
        this.title = 'Do you wish to delete this company type?';
        break;                        
    }

  }

  backToList() {
    this.router.navigate(['/companytypes']);
  }

  editDetail() {
    this.action = Action[Action.Edit];
  }

}

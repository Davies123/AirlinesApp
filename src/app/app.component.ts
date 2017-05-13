import { Component } from '@angular/core';
import { CompanyTypeEnum } from './models/enum.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  CompanyTypeEnum = CompanyTypeEnum;

  title = 'Airlines App';
  
}

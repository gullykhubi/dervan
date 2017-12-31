import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonService } from "./common.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public commonService: CommonService){

  }
}

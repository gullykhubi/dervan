import { Component, OnInit } from '@angular/core';
import { CommonService } from "../common.service";
@Component({
  selector: 'app-confirmation-form',
  templateUrl: './confirmation-form.component.html',
  styleUrls: ['./confirmation-form.component.css']
})
export class ConfirmationFormComponent implements OnInit {
  dateOfBirth: string;
  isCaptain: String;
  amount: number;
  constructor(public commonService : CommonService) { }

  ngOnInit() {
    this.isCaptain=this.commonService.selectMode=== 'ind'?"":"Captain ";
    let dob=new Date(this.commonService.partidetails.dob);
    this.dateOfBirth = dob.getDate()+'-'+ (dob.getMonth() + 1 ) + '-'+ dob.getFullYear();
    this.amount = this.commonService.selectMode === 'team' ? 500 : 100;
  }

}

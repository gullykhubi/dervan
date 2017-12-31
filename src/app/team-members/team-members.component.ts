import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {
  err: any =[];
  partidetails: any;
  years: any =[];
  daylist=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  monthlist= [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
  day: any;
  month: any;
  year: any;
  @Output('close')
  close = new EventEmitter();

  yrs: any = 0;
  months: any = 0;
  dayofbirth:any ;
  isEmpty = function(n, e) {
    "" == n.trim() && this.err.push(e + " is Required")
  }
  constructor(public commonService: CommonService) {
    this.partidetails=JSON.parse(JSON.stringify(this.commonService.teamMemberDetail));
  }

  ngOnInit() {
    for(let i=1970; i<=new Date().getFullYear()-10;i++) {
			this.years.push(i);
		}
  }
  onchange(){
      this.commonService.getAge((this.partidetails.month) + ',' + this.partidetails.day + ',' + this.partidetails.year, "01/01/2018");
  }

  valideDate:boolean=false;
  isLeapyear(){
		if(this.partidetails.year!=undefined&&(((this.partidetails.year % 4 == 0) && (this.partidetails.year % 100 != 0)) || (this.partidetails.year % 400 == 0)))
			return true;
		return false;
	}
    calAge(n) {
        let d = 31;
        if (this.partidetails.day !== '' && this.partidetails.month !== '' &&  this.partidetails.year !== '') {
            if (this.partidetails.month == 'February') {
                if ((this.isLeapyear() && this.partidetails.day < 30) || this.partidetails.day < 29) {
                    d = 28;
                    if (this.isLeapyear()) {
                        d = 28;
                    }
                    this.valideDate = true;
                }
            }
            else if (this.partidetails.month == 'April' || this.partidetails.month == 'June' || this.partidetails.month == 'September' || this.partidetails.month == 'November') {
                if (this.day < 31) {
                    this.valideDate = true;
                    d = 31;
                }
            }
            else {
                this.valideDate = true;
            }
            if (this.valideDate) {
                let ageDifMs = new Date('01/01/2018').getTime() - new Date(this.partidetails.month + '/' + this.partidetails.day + '/' + this.partidetails.year).getTime();
                let abc = this.commonService.getAge((this.partidetails.month) + ',' + this.partidetails.day + ',' + this.partidetails.year, "01/01/2018");
                var ageDate = new Date(ageDifMs);
                this.dayofbirth = abc["day"];
                this.months = (abc["month"] < 0 || (abc["month"] == 0 && abc["day"] < 0)) ? 11 : abc["month"];
                this.yrs = abc["year"];
                this.valideDate = false;
            }
          }
  }
  save(){
    this.err=[];
    if(this.commonService.eventSelected.length === 0){
        this.err.push("Kindly select atleast one Event");
        return false;
    }
    let minAge : any=[];
    this.commonService.eventSelected.map((e)=>{
      minAge.push(e.minage);
    });
    minAge = minAge.sort((a,b)=>{
      return a>b;
    });
    this.isEmpty(this.partidetails.firstname, "Name");
    this.isEmpty(this.partidetails.lastname, "Surname");
    this.isEmpty(this.partidetails.contactno, "Mobile Number");
    this.isEmpty(this.partidetails.alternativeno, "Emergence Number");
    this.isEmpty(this.partidetails.email, "Email-Id");
    if(this.partidetails.day === '' || this.partidetails.month === '' || this.partidetails.year === ''){
      this.err.push("Enter the Date of Birth.");
      return false;
    }
    let age=this.commonService.getAge((this.partidetails.month) + ',' + this.partidetails.day + ',' + this.partidetails.year, "01/01/2018");
    if(age.year>minAge[0]){
      this.err.push("Maximum age should be "+minAge[0]+" for the player");
      return false;
    }
    this.partidetails.dob = new Date(this.partidetails.month + '/' + this.partidetails.day + '/' + this.partidetails.year);
    this.commonService.teamMemberDetailsList.push(this.partidetails);
    this.partidetails = JSON.parse(JSON.stringify(this.commonService.teamMemberDetail));
    this.close.emit('close');
  }
  cancel() {
    this.close.emit('close');
  }
}

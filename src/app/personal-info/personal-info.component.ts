import { Component, OnInit } from '@angular/core';
import { india_states } from '../states';
import { schoolnames } from '../schoolname';

import { cityNamesList } from '../cityNames';

import { CommonService } from "../common.service";
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  states = india_states;
  schoolNames=schoolnames;
  tempCity:string='';
  nameofSchool="";
  years: any =[];
  yrs: any = 0;
  months: any = 0;
  day: any;
  month: any;
  year: any;
  valideDate=false;
  dayofbirth=0;
  err:any =[];
  daylist=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  citiesList=cityNamesList;

  monthlist= [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
  constructor(public commonService: CommonService) { }
  ngOnInit() {
    for(let i=2000;i<=new Date().getFullYear()-10;i++) {
			this.years.push(i);
		}
    //this.commonService.partidetails.gender='B';
  }
  isLeapyear(){
		if(this.year!=undefined&&(((this.year % 4 == 0) && (this.year % 100 != 0)) || (this.year % 400 == 0)))
			return true;
		return false;
	}
    calAge(n) {
          let d = 31;
        if (this.day != undefined && this.month != undefined && this.year != undefined) {
            if (this.month == 'February') {
                if ((this.isLeapyear() && this.day < 30) || this.day < 29) {
                    d = 28;
                    if (this.isLeapyear()) {
                        d = 28;
                    }
                    this.valideDate = true;
                }
            }
            else if (this.month == 'April' || this.month == 'June' || this.month == 'September' || this.month == 'November') {
                if (this.day < 31) {
                    this.valideDate = true;
                    d = 31;
                }
            }
            else {
                this.valideDate = true;
            }
            if (this.valideDate) {
                this.commonService.partidetails.dob = new Date(this.month + '/' + this.day + '/' + this.year);
                let ageDifMs = new Date('01/01/2018').getTime() - new Date(this.month + '/' + this.day + '/' + this.year).getTime();
                let abc = this.commonService.getAge((this.month) + '/' + this.day + '/' + this.year, "01/01/2018");
                var ageDate = new Date(ageDifMs);
                this.dayofbirth = abc["day"];
                this.months = (abc["month"] < 0 || (abc["month"] == 0 && abc["day"] < 0)) ? 11 : abc["month"];
                this.yrs = abc["year"];
                this.valideDate = false;
            }
        }
            }
    getAge(fromdate1, todate):any {
          if (todate)
              todate = new Date(todate);
          else
              todate = new Date();
          let age = {};
          let fromdate = new Date(fromdate1);
          let y = [todate.getFullYear(), fromdate.getFullYear()];
          let ydiff = y[0] - y[1];
          let m = [todate.getMonth(), fromdate.getMonth()];
          let mdiff = m[0] - m[1];
          let d = [ todate.getDate(), fromdate.getDate()];
          let ddiff = d[1] - d[0];
          if (mdiff < 0 || (mdiff === 0 && d[1] - d[0] < 0))
              --ydiff;
          if (mdiff < 0)
              mdiff += 12;
          if (ddiff < 0) {
              fromdate.setMonth(m[1] + 1, 0);
              ddiff = fromdate.getDate() - d[1] + d[0];
              --mdiff;
          }
          age["year"] = (ydiff);
          age["month"] = (mdiff);
          age["day"] = (ddiff);
          return age;
      }
      isEmpty = function(n, e) {
        "" == n.trim() && this.err.push(e + " is Required")
      }
	  isNumber(value,msg){
		if("" !== value.trim() &&isNaN(value)){
			this.err.push("Please enter valid value in "+msg);
		}
		}
    minimumLength(value,msg){
		if(value.trim().length<3){
			this.err.push(msg+" should minimum of 3 alphabets");
		}
		}
    numberLenghtCheck(value, minLength, maxLength, msg){
      if(value.trim().length< minLength || value.trim().length > maxLength){
  			this.err.push("Please enter valid "+msg);
  		}
    }
    moveNext(){
        this.err = [];
		    if(this.nameofSchool!=='other'){
			         this.commonService.partidetails.nameOfSchoolOrClub=this.nameofSchool;
		    }
        if(this.tempCity!=='other'){
			         this.commonService.partidetails.city=this.tempCity;
		    }
        if(this.commonService.partidetails.gender=== ""){
          this.err.push("Please Select the Gender");
        }
        this.isEmpty(this.commonService.partidetails.firstname, "Name");
        this.isEmpty(this.commonService.partidetails.lastname, "Surname");
        this.minimumLength(this.commonService.partidetails.firstname, "First Name");
        this.minimumLength(this.commonService.partidetails.lastname, "Surname");
        this.isEmpty(this.commonService.partidetails.addr1, "Address");
        this.isEmpty(this.commonService.partidetails.nameOfSchoolOrClub, "Name Of the School/Club");
        //this.isEmpty(this.commonService.partidetails.addressOfSchoolOrClub, "School/Club Address");
        this.isEmpty(this.commonService.partidetails.contactno, "Mobile Number");
		    this.isNumber(this.commonService.partidetails.contactno, "Mobile Number");
        this.isEmpty(this.commonService.partidetails.alternativeno, "Emergency Number");
		    this.isNumber(this.commonService.partidetails.alternativeno, "Emergency Number");
        this.numberLenghtCheck(this.commonService.partidetails.contactno, 10, 10, 'Mobile Number');
		    this.numberLenghtCheck(this.commonService.partidetails.alternativeno, 5, 12, 'Emergency Contact Number');
        this.isEmpty(this.commonService.partidetails.email, "Email-Id");
        this.isEmpty(this.commonService.partidetails.state, "State");
        this.isEmpty(this.commonService.partidetails.city, "City");
        this.isEmpty(this.commonService.partidetails.pincode, "Pin Code");
		    this.isNumber(this.commonService.partidetails.pincode, "Pin Code");
        this.isEmpty(this.commonService.partidetails.identitytype, "Identity Document");
		    this.isEmpty(this.commonService.partidetails.identitynumber, "Identity Number");
        if(this.commonService.partidetails.identitytype === 'Aadhar'){
          this.numberLenghtCheck(this.commonService.partidetails.identitynumber, 12, 12, 'Aadhar Number');
        }

        /*this.isEmpty(this.commonService.partidetails.schoolstate, "State of school");
        this.isEmpty(this.commonService.partidetails.schoolcity, "City of school");
        this.isEmpty(this.commonService.partidetails.schoolpincode, "Code of school");
        this.isNumber(this.commonService.partidetails.schoolpincode, "Code of school");
		*/
		if(this.err.length === 0){
            this.commonService.partidetails.age=this.yrs + "," + this.months;
            let temp={};
			      for(let i=0;i<this.commonService.list[this.commonService.selectMode].length;i++){
              if(this.commonService.eventList[this.commonService.selectMode][this.commonService.list[this.commonService.selectMode][i]][this.commonService.partidetails.gender]!== undefined)
				        temp[this.commonService.list[this.commonService.selectMode][i]]=this.commonService.eventList[this.commonService.selectMode][this.commonService.list[this.commonService.selectMode][i]][this.commonService.partidetails.gender].filter((e)=>{return this.isEligible(e);});
	          }
            this.commonService.selectedEventList=temp;
            this.commonService.currentPage="eventSelection";
		    }
      }
      getKey(n) {
                return Object.keys(n)
      }
      isEligible = function(n) {
          var e = n[this.getKey(n)[1]];
          return (e > this.yrs || e == this.yrs && 0 == this.months && 0 == this.dayofbirth) && (e < 21 || e == this.yrs && 0 == this.months && 21 == this.yrs && 0 == this.dayofbirth)
      }
	}

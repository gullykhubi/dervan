import { Component, OnInit } from '@angular/core';

import { CommonService } from "../common.service";
@Component({
  selector: 'app-event-selection',
  templateUrl: './event-selection.component.html',
  styleUrls: ['./event-selection.component.css']
})
export class EventSelectionComponent implements OnInit {
  addMember: boolean=false;
  conditions:any={
    "BASKET BALL" : { "min" : 5 , "max" : 7 },
    "FOOTBALL" :{ "min" : 11 , "max" : 14},
    "KABADDI" : {"min": 7 , "max" : 12},
    "KHO KHO" : { "min": 9 , "max" : 12},
    "LANGADI" : { "min": 12 , "max" : 15},
    "VOLLEYBALL" : {"min" : 6 , "max" : 12},
    "ATHLETICS" : {"min" : 4 , "max" : 4},
    "SWIMMING"  : {"min" : 4 , "max" : 4}
  };
  err=[];
  constructor(public commonService: CommonService) { }
  selectedDiscipline:any;
  ngOnInit() {
    this.commonService.eventSelected=[];
  }
  getKey(n) {
            return Object.keys(n)
  }
  addPlayer(){
    this.addMember = true;
  }
  selectDecipline(dis){
    this.commonService.eventSelected=[];
    this.selectedDiscipline=dis;
  }
  delete(ind){
      this.commonService.teamMemberDetailsList=this.commonService.teamMemberDetailsList.filter((n,i)=>{
        return i!==ind;
      });
  }
  addorremove(event, obj,name){
    const temp = this.commonService.eventSelected.filter((n:any,i)=>{
      return n.eventid === this.getKey(obj)[0];
    })
    if(temp.length>0){
      this.commonService.eventSelected=this.commonService.eventSelected.filter((n:any,i)=>{
        return n.eventid !== this.getKey(obj)[0];
      });
    }else{
      this.commonService.eventSelected.push({"eventid": this.getKey(obj)[0],"text": obj[this.getKey(obj)[0]],"minage":obj['minage'],"name":name});
    }
  }
  save() {
    this.err=[];
    if(this.commonService.selectMode === 'ind'){
      if(this.commonService.eventSelected.length==0){
        this.err.push("Select Events");
        return;
      }
    }else if(this.commonService.selectMode === 'team'){
      if(this.selectedDiscipline === undefined){
        this.err.push("Select Decipline");
        return;
      }
      if(this.commonService.eventSelected.length==0){
        this.err.push("Select Events");
        return;
      }
      if(this.conditions[this.selectedDiscipline]['min']-1 > this.commonService.teamMemberDetailsList.length ||this.conditions[this.selectedDiscipline]['max']-1 < this.commonService.teamMemberDetailsList.length){
        this.err.push("Team Size must be Minimum:"+this.conditions[this.selectedDiscipline]['min']+" and Maximum :"+this.conditions[this.selectedDiscipline]['max']+" for the "+ this.selectedDiscipline);
        return;
      }
    }
    this.commonService.save();
  }
  closeDialog(){
    this.addMember = false;
  }
}

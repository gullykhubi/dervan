import { Component, OnInit } from '@angular/core';
import { CommonService } from "../common.service";
declare var pdfMake: any;

@Component({
  selector: 'app-submition-msg',
  templateUrl: './submition-msg.component.html',
  styleUrls: ['./submition-msg.component.css']
})
export class SubmitionMsgComponent implements OnInit {
pdf: any;
  constructor(public commonService: CommonService) { }

  ngOnInit() {
  }
  newRegistration(){
     this.commonService.reset();
  }
  print(){
    let item = {firstName: 'Peter', lastName: 'Parker'};
    this.pdf = pdfMake;
    this.pdf.createPdf(this.buildPdf(item)).download('form.pdf');
  }
  buildPdf(value) {
     var pdfContent = value;
     let content =[];
     content.push(this.getHeader());
     content.push(this.getPNR());
    let a=this.commonService.selectMode=== 'ind'?"Personal":"Team";
     content.push({"table":{"widths":["*"],"body":[[{"alignment":"center","fontSize":16,"color":"#404040","text":a+" Information"}]]}});
     content.push(this.getPersonalInfo());
     content.push(this.getBloodGroup());
     if(this.commonService.selectMode=== 'team'){
       content.push(this.addPlayers());
     }

     content.push(this.addGames());
     content.push(this.paymentDetails());
     content.push(this.getDisclaimer());
     var docDefinition = {
       "pageMargins": [
           20,
           20,
           20,
           20
         ],
       content: content
     }
     return docDefinition;
  }
  addPlayers(){
    let games=[];
    games.push([{"text":"Sr No"},{"text":"Player NAME"},{"text":"D.O.B"},{"text":"Number"}]);

    for(let i=0;i<this.commonService.teamMemberDetailsList.length;i++){
      let temp=this.commonService.teamMemberDetailsList[i];
      let name=temp.firstname+ " " +temp.lastname;
      let dob=temp.day+'-'+temp.month+'-'+temp.year;
      games.push([{"text":(i+1)},{"text":name},{"text":dob},{"text":temp.contactno}])
    }

    return {
  "style": "tableExample",
  "alignment": "center",
  "margin":[0,30,0,0],
  "table": {
    "widths": [
      50,
      200,
      100,
      150
    ],
    "body": games
  }
}
  }
  addGames(){
    let games=[];
    games.push([{"text":"GAME#"},{"text":"GAME NAME"},{"text":"GAME TYPE"},{"text":"FEES"}]);
    let a=70;//this.commonService.selectMode=== 'team'?500:100;
    for(let i=0;i<this.commonService.eventSelected.length;i++){
      let temp=this.commonService.eventSelected[i];
      games.push([{"text":(i+1)},{"text":temp.name},{"text":temp.text},{"text":"Rs "+a}])
    }
    let amount = this.commonService.eventSelected.length*a;
    games.push([{"text":""},{"text":""},{"text":"Total Amount(Inclusive G.S.T) : "},{"text" : "Rs "+ (amount) }]);
  //  games.push([{"text":""},{"text":""},{"text":"G.S.T 18% : "},{"text" : "Rs "+ (amount*0.18) }]);

    //games.push([{"text":""},{"text":""},{"text":"Total Amount Payable : "},{"text" : "Rs "+ (amount + amount*0.18) }]);

    return {
  "style": "tableExample",
  "alignment": "center",
  "margin":[0,30,0,0],
  "table": {
    "widths": [
      50,
      200,
      200,
      50
    ],
    "body": games
  }
}
  }
  paymentDetails(){
    let content=[];
    content.push([{"text":"Account Name : Vithalrao Joshi Charities Trust"}]);
    content.push([{"text":"Name : Bank of India"}]);
    content.push([{"text":"Branch Address : Ayeshabi complex, Bazaar peth, Chiplun, Ratnagiri, Maharashtra"}]);
    content.push([{"text":"Account Number :141110200017659"}]);
    content.push([{"text":"IFSC Code : BKID0001411"}]);

    return {
  "style": "tableExample",
  "margin":[0,30,10,10],
  "table": {
    "body": content
  }
}
  }
  getPNR(){
    return {"text":"PRN - "+this.commonService.regNo,"fontSize":17,"color":"#1F4E79"}
  }
  getDisclaimer(){
    return {
	        fontSize:10,
	    	    italics:true,
	    stack :[
	    {text :'Disclaimer: ',margin:[0,5,0,0]},
	    	{
	    	    fontSize:10,
	    	    italics:true,
			    type: 'lower-roman',
			    ol: [
			        {
			        stack:[
			            {text:'Payment to be made at SVJCT Sports Complex Office, Dervan in case of cash payment.',margin:[0,5,0,0]}
			            /*{text :'Bank Account no. :141110200017659',margin:[0,5,0,0]},
			            {text :'Account Name:Vithalrao Joshi Charities Trust',margin:[0,5,0,0]},
			            {text :'Bank Name & Branch: Bank of India, Chiplun Branch, Ayeshabi Complex, Bazaar Peth, Chiplun, Ratnagiri, Maharashtra',margin:[0,5,0,0]},
			            {text :'IFSC Code: BKID0001411',margin:[0,5,0,0]}*/
			        ]
			    },
			    {text :'Entry fees Rs.70/-   per Entry ( Inclusive of GST) shall be levied;',margin:[0,5,0,0]},
           {text 'Last date of payment is September 3, 2018 beyond which Late Fee of Rs. 25/-',margin:[0,5,0,0]},
				    {
			        stack:[
			            {text :'At the time of reporting every participant should carry ',margin:[0,5,0,0]},
			    {
			        type: 'lower-alpha',
			        ol: [
				        {text :'Printout of the registration formdully filled in(Affix latest photograph)  alongwith payment receipt issued by the office of SVJCT Sports Academy;',margin:[0,5,0,0]},
				        {text :'Original and a photocopy / xerox of the age proof e.g. Aadhar card/SSC Certificate/School Certificate as is provided by the participant at the time of registration;',margin:[0,5,0,0]},
				        {text :'Reporting time 7 a.m. to 9 a.m. on 6th September, 2018.',margin:[0,5,0,0]}
              ]
		        }]},
		        {text :'SVJCT Sports Academy Management reserves all rights to modify/change, add/cancel etc. any of the event in respect of the DYG 2018 as it deems fit and proper.',margin:[0,5,0,0]}
			]
		}]};
  }

  getBloodGroup(){
    return {fontSize:12,"table":{"widths":[268,268],"color":"#404040","body":[[{"fontWeight":"bolder","stack":[{"margin":[0,2,0,2],"text":[{"fontSize":12,"text":"ID Document : "},{"text":this.commonService.partidetails.identitytype}]},{"margin":[0,2,0,2],"text":[{"fontSize":12,"text":"ID NUMBER :"},{"text":this.commonService.partidetails.identitynumber}]}]},{"fontWeight":"bolder","stack":[{"margin":[0,2,0,2],"text":[{"fontSize":12,"text":"BLOOD GROUP :"},{"text":this.commonService.partidetails.bloodgroup}]}]}]]}};
  }
  getPersonalInfo(){
    let a=this.commonService.selectMode=== 'ind'?"":"Captain ";
    let dob=new Date(this.commonService.partidetails.dob);
    let temp = dob.getDate()+'-'+ (dob.getMonth() + 1 ) + '-'+ dob.getFullYear();
    return {fontSize:12,"table":{"widths":[268,268],"color":"#404040","body":[[{"fontWeight":"bolder","stack":[{"margin":[0,2,0,2],"text":[{"fontSize":12,"text":a+"NAME : "},{"margin":[20,0,0,0],"text":this.commonService.partidetails.firstname+' '+this.commonService.partidetails.middlename+' '+this.commonService.partidetails.lastname}]},{"margin":[0,2,0,2],"text":[{"fontSize":12,"text":"DATE OF BIRTH : "},{"text":temp}]},{"margin":[0,2,0,2],"text":[{"fontSize":12,"text":"ADDRESS :\n"},{"text": this.commonService.partidetails.addr1+", "+this.commonService.partidetails.city+"-"+this.commonService.partidetails.pincode+", "+this.commonService.partidetails.state}]},{"margin":[0,2,0,2],"text":[{"fontSize":12,"text":"MOBILE :"},{"text":this.commonService.partidetails.contactno}]}]},{"fontWeight":"bolder","stack":[{"margin":[0,2,0,2],"text":[{"fontSize":12,"text":"SCHOOL/CLUB/TEAM :"},{"margin":[20,0,0,0],"text":this.commonService.partidetails.nameOfSchoolOrClub}]},{"margin":[0,2,0,2],"text":[{"fontSize":12,"text":"EMERGENCY PHONE :"},{"text":this.commonService.partidetails.alternativeno}]}]}]]}};
  }
  getHeader(){
      return {"columns":[{"width":5,"canvas":[{"type":"line","x1":0,"y1":10,"x2":0,"y2":60,"lineWidth":2,"lineColor":"#1F4E79"}]},{"width":5,"canvas":[{"type":"line","x1":0,"y1":10,"x2":0,"y2":60,"lineWidth":2,"lineColor":"#1F4E79"}]},{"width":400,"stack":[{"text":"SVJCT’S SPORTS ACADEMY","fontSize":20,"color":"#1F4E79","margin":[0,7,0,0]},{"text":"DERVAN YOUTH GAMES - 2018","fontSize":15,"color":"#3E86CA","margin":[0,7,0,0]},{"text":"REGISTRATION CONFIRMATION FORM","fontSize":17,"color":"#1F4E79","margin":[0,27,0,0]}]},{"width":5,"canvas":[{"type":"rect","x":0,"y":10,"w":140,"h":180,"lineWidth":2,"lineColor":"#1F4E79"}]}]};
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonService } from "../common.service";
@Component({
  selector: 'app-select-mode',
  templateUrl: './select-mode.component.html',
  styleUrls: ['./select-mode.component.css']
})
export class SelectModeComponent implements OnInit {

  constructor(public commonService: CommonService) { }

  ngOnInit() {
    this.commonService.selectMode = 'ind'
  }

}

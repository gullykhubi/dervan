import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from "./common.service";
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SelectModeComponent } from './select-mode/select-mode.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { EventSelectionComponent } from './event-selection/event-selection.component';
import { SubmitionMsgComponent } from './submition-msg/submition-msg.component';
import { TeamMembersComponent } from './team-members/team-members.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SelectModeComponent,
    PersonalInfoComponent,
    EventSelectionComponent,
    SubmitionMsgComponent,
    TeamMembersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule

  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }

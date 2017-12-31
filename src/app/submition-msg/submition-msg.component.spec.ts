import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitionMsgComponent } from './submition-msg.component';

describe('SubmitionMsgComponent', () => {
  let component: SubmitionMsgComponent;
  let fixture: ComponentFixture<SubmitionMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitionMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitionMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

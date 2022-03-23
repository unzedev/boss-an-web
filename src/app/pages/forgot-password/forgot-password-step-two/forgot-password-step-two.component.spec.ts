import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordStepTwoComponent } from './forgot-password-step-two.component';

describe('ForgotPasswordStepTwoComponent', () => {
  let component: ForgotPasswordStepTwoComponent;
  let fixture: ComponentFixture<ForgotPasswordStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

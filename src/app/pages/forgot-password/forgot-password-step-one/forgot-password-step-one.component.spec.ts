import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordStepOneComponent } from './forgot-password-step-one.component';

describe('ForgotPasswordStepOneComponent', () => {
  let component: ForgotPasswordStepOneComponent;
  let fixture: ComponentFixture<ForgotPasswordStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

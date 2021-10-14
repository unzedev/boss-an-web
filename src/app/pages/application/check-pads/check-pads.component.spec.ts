import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPadsComponent } from './check-pads.component';

describe('CheckPadsComponent', () => {
  let component: CheckPadsComponent;
  let fixture: ComponentFixture<CheckPadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportResultComponent } from './report-result.component';

describe('ReportResultComponent', () => {
  let component: ReportResultComponent;
  let fixture: ComponentFixture<ReportResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

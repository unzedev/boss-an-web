import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminPlansComponent } from './admin-plans.component';

describe('AdminPlansComponent', () => {
  let component: AdminPlansComponent;
  let fixture: ComponentFixture<AdminPlansComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

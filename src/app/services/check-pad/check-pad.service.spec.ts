import { TestBed } from '@angular/core/testing';

import { CheckPadService } from './check-pad.service';

describe('CheckPadService', () => {
  let service: CheckPadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckPadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

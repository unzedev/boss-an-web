import { TestBed } from '@angular/core/testing';

import { OwnerAuthGuard } from './owner-auth.guard';

describe('OwnerAuthGuard', () => {
  let guard: OwnerAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OwnerAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

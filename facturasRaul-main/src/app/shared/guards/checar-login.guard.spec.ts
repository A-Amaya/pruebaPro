import { TestBed } from '@angular/core/testing';

import { ChecarLoginGuard } from './checar-login.guard';

describe('ChecarLoginGuard', () => {
  let guard: ChecarLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChecarLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

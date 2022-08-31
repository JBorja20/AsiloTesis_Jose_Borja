import { TestBed } from '@angular/core/testing';

import { AuthasilosGuard } from './authasilos.guard';

describe('AuthasilosGuard', () => {
  let guard: AuthasilosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthasilosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

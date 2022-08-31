import { TestBed } from '@angular/core/testing';

import { SubirfotosService } from './subirfotos.service';

describe('SubirfotosService', () => {
  let service: SubirfotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirfotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

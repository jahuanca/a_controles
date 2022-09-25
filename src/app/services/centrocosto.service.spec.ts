import { TestBed } from '@angular/core/testing';

import { CentroCostoService } from './centrocosto.service';

describe('CentroCostoService', () => {
  let service: CentroCostoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroCostoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PreTareoProcesoUvaService } from './pre-tareo-proceso-uva.service';

describe('PreTareoProcesoUvaService', () => {
  let service: PreTareoProcesoUvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreTareoProcesoUvaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

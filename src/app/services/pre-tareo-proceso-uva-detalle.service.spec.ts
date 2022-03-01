import { TestBed } from '@angular/core/testing';

import { PreTareoProcesoUvaDetalleService } from './pre-tareo-proceso-uva-detalle.service';

describe('PreTareoProcesoUvaDetalleService', () => {
  let service: PreTareoProcesoUvaDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreTareoProcesoUvaDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

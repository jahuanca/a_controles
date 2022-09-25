import { TestBed } from '@angular/core/testing';

import { AbsentismoService } from './absentismo.service';

describe('AbsentismoService', () => {
  let service: AbsentismoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsentismoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

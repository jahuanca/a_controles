import { TestBed } from '@angular/core/testing';

import { QASService } from './qas.service';

describe('QASService', () => {
  let service: QASService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QASService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

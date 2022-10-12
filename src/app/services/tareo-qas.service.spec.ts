import { TestBed } from '@angular/core/testing';

import { TareoQASService } from './tareo-qas.service';

describe('TareoQASService', () => {
  let service: TareoQASService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareoQASService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

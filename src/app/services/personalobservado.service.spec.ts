import { TestBed } from '@angular/core/testing';

import { PersonalObservadoService } from './personalobservado.service';

describe('PersonalObservadoService', () => {
  let service: PersonalObservadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalObservadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

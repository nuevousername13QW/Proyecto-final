import { TestBed } from '@angular/core/testing';

import { PersonasDentroService } from './personas-dentro.service';

describe('PersonasDentroService', () => {
  let service: PersonasDentroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonasDentroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { IdcompucarnetsService } from './idcompucarnets.service';

describe('IdcompucarnetsService', () => {
  let service: IdcompucarnetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdcompucarnetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

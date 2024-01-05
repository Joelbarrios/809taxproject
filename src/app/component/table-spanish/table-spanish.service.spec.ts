import { TestBed } from '@angular/core/testing';

import { TableSpanishService } from './table-spanish.service';

describe('TableSpanishService', () => {
  let service: TableSpanishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableSpanishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

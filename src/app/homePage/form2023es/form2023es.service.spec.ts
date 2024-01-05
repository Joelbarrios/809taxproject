import { TestBed } from '@angular/core/testing';

import { Form2023esService } from './form2023es.service';

describe('Form2023esService', () => {
  let service: Form2023esService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Form2023esService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

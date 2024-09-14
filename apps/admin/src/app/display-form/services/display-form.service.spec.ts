import { TestBed } from '@angular/core/testing';

import { DisplayFormService } from './display-form.service';

describe('DisplayFormService', () => {
  let service: DisplayFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

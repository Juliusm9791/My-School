import { TestBed } from '@angular/core/testing';

import { FormPostService } from './form-post.service';

describe('FormPostService', () => {
  let service: FormPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

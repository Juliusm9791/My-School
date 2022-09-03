import { TestBed } from '@angular/core/testing';

import { PostDetailsService } from './post-details.service';

describe('PostDetailsService', () => {
  let service: PostDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

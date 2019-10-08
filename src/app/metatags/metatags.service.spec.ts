import { TestBed } from '@angular/core/testing';

import { MetatagsService } from './metatags.service';

describe('MetatagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetatagsService = TestBed.get(MetatagsService);
    expect(service).toBeTruthy();
  });
});

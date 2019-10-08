import { TestBed } from '@angular/core/testing';

import { UriService } from './uri.service';

describe('UriService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UriService = TestBed.get(UriService);
    expect(service).toBeTruthy();
  });
});

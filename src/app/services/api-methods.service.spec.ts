import { TestBed, inject } from '@angular/core/testing';

import { ApiMethodsService } from './api-methods.service';

describe('ApiMethodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiMethodsService]
    });
  });

  it('should be created', inject([ApiMethodsService], (service: ApiMethodsService) => {
    expect(service).toBeTruthy();
  }));
});

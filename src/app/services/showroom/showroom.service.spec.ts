import { TestBed } from '@angular/core/testing';

import { ShowroomService } from './showroom.service';

describe('ShowroomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowroomService = TestBed.get(ShowroomService);
    expect(service).toBeTruthy();
  });
});

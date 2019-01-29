import { TestBed } from '@angular/core/testing';

import { BookATestDriveService } from './book-a-test-drive.service';

describe('BookATestDriveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookATestDriveService = TestBed.get(BookATestDriveService);
    expect(service).toBeTruthy();
  });
});

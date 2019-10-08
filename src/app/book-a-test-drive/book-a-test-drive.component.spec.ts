import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookATestDriveComponent } from './book-a-test-drive.component';

describe('BookATestDriveComponent', () => {
  let component: BookATestDriveComponent;
  let fixture: ComponentFixture<BookATestDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookATestDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookATestDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

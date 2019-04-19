import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffordableResultsComponent } from './affordable-results.component';

describe('AffordableResultsComponent', () => {
  let component: AffordableResultsComponent;
  let fixture: ComponentFixture<AffordableResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffordableResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffordableResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

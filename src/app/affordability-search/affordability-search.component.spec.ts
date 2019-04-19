import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffordabilitySearchComponent } from './affordability-search.component';

describe('AffordabilitySearchComponent', () => {
  let component: AffordabilitySearchComponent;
  let fixture: ComponentFixture<AffordabilitySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffordabilitySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffordabilitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitabilitySearchComponent } from './suitability-search.component';

describe('SuitabilitySearchComponent', () => {
  let component: SuitabilitySearchComponent;
  let fixture: ComponentFixture<SuitabilitySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitabilitySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitabilitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

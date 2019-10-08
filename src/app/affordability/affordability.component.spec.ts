import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffordabilityComponent } from './affordability.component';

describe('AffordabilityComponent', () => {
  let component: AffordabilityComponent;
  let fixture: ComponentFixture<AffordabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffordabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffordabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

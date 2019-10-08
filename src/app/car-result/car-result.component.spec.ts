import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarResultComponent } from './car-result.component';

describe('CarResultComponent', () => {
  let component: CarResultComponent;
  let fixture: ComponentFixture<CarResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

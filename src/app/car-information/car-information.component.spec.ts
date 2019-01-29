import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInformationComponent } from './car-information.component';

describe('CarInformationComponent', () => {
  let component: CarInformationComponent;
  let fixture: ComponentFixture<CarInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

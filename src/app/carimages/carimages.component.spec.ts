import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarimagesComponent } from './carimages.component';

describe('CarimagesComponent', () => {
  let component: CarimagesComponent;
  let fixture: ComponentFixture<CarimagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarimagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

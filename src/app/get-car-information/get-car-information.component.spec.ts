import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCarInformationComponent } from './get-car-information.component';

describe('GetCarInformationComponent', () => {
  let component: GetCarInformationComponent;
  let fixture: ComponentFixture<GetCarInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCarInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCarInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

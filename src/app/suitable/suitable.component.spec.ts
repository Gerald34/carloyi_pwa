import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitableComponent } from './suitable.component';

describe('SuitableComponent', () => {
  let component: SuitableComponent;
  let fixture: ComponentFixture<SuitableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

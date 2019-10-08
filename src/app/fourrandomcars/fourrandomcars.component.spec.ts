import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourrandomcarsComponent } from './fourrandomcars.component';

describe('FourrandomcarsComponent', () => {
  let component: FourrandomcarsComponent;
  let fixture: ComponentFixture<FourrandomcarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourrandomcarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourrandomcarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

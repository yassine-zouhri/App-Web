import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateIncidentProComponent } from './validate-incident-pro.component';

describe('ValidateIncidentProComponent', () => {
  let component: ValidateIncidentProComponent;
  let fixture: ComponentFixture<ValidateIncidentProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateIncidentProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateIncidentProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

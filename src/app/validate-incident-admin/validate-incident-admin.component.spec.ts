import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateIncidentAdminComponent } from './validate-incident-admin.component';

describe('ValidateIncidentAdminComponent', () => {
  let component: ValidateIncidentAdminComponent;
  let fixture: ComponentFixture<ValidateIncidentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateIncidentAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateIncidentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

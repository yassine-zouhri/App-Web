import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIncidentComponent } from './table-incident.component';

describe('TableIncidentComponent', () => {
  let component: TableIncidentComponent;
  let fixture: ComponentFixture<TableIncidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableIncidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfacePublicComponent } from './interface-public.component';

describe('InterfacePublicComponent', () => {
  let component: InterfacePublicComponent;
  let fixture: ComponentFixture<InterfacePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfacePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfacePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

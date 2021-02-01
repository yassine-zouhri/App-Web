import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapheInterfaceComponent } from './graphe-interface.component';

describe('GrapheInterfaceComponent', () => {
  let component: GrapheInterfaceComponent;
  let fixture: ComponentFixture<GrapheInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrapheInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrapheInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOnlyComponent } from './tabla-only.component';

describe('TablaOnlyComponent', () => {
  let component: TablaOnlyComponent;
  let fixture: ComponentFixture<TablaOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

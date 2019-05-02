import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridBolsComponent } from './ag-grid-bols.component';

describe('AgGridBolsComponent', () => {
  let component: AgGridBolsComponent;
  let fixture: ComponentFixture<AgGridBolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridBolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridBolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

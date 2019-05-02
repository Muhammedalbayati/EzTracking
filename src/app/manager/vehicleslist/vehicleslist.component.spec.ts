import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleslistComponent } from './vehicleslist.component';

describe('VehicleslistComponent', () => {
  let component: VehicleslistComponent;
  let fixture: ComponentFixture<VehicleslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

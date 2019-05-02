import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargolistComponent } from './cargolist.component';

describe('CargolistComponent', () => {
  let component: CargolistComponent;
  let fixture: ComponentFixture<CargolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

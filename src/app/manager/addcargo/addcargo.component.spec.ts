import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcargoComponent } from './addcargo.component';

describe('AddcargoComponent', () => {
  let component: AddcargoComponent;
  let fixture: ComponentFixture<AddcargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

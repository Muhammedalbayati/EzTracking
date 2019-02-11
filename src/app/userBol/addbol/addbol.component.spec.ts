import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbolComponent } from './addbol.component';

describe('AddbolComponent', () => {
  let component: AddbolComponent;
  let fixture: ComponentFixture<AddbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

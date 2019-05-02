import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpbgsComponent } from './addpbgs.component';

describe('AddpbgsComponent', () => {
  let component: AddpbgsComponent;
  let fixture: ComponentFixture<AddpbgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpbgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpbgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

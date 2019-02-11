import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbolComponent } from './newbol.component';

describe('NewbolComponent', () => {
  let component: NewbolComponent;
  let fixture: ComponentFixture<NewbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

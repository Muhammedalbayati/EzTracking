import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedBolListComponent } from './submitted-bol-list.component';

describe('SubmittedBolListComponent', () => {
  let component: SubmittedBolListComponent;
  let fixture: ComponentFixture<SubmittedBolListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittedBolListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedBolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

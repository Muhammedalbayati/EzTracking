import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolPrintComponent } from './bol-print.component';

describe('BolPrintComponent', () => {
  let component: BolPrintComponent;
  let fixture: ComponentFixture<BolPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

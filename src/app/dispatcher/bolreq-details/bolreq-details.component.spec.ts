import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolreqDetailsComponent } from './bolreq-details.component';

describe('BolreqDetailsComponent', () => {
  let component: BolreqDetailsComponent;
  let fixture: ComponentFixture<BolreqDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolreqDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolreqDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

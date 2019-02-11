import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolDetailComponent } from './bol-detail.component';

describe('BolDetailComponent', () => {
  let component: BolDetailComponent;
  let fixture: ComponentFixture<BolDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

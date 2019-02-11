import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolRequestsComponent } from './bol-requests.component';

describe('BolRequestsComponent', () => {
  let component: BolRequestsComponent;
  let fixture: ComponentFixture<BolRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

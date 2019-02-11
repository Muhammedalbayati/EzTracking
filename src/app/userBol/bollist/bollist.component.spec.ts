import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BollistComponent } from './bollist.component';

describe('BollistComponent', () => {
  let component: BollistComponent;
  let fixture: ComponentFixture<BollistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BollistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BollistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

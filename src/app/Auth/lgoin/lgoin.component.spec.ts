import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgoinComponent } from './lgoin.component';

describe('LgoinComponent', () => {
  let component: LgoinComponent;
  let fixture: ComponentFixture<LgoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

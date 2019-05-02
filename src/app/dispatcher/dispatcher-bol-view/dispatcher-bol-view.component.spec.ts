import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherBolViewComponent } from './dispatcher-bol-view.component';

describe('DispatcherBolViewComponent', () => {
  let component: DispatcherBolViewComponent;
  let fixture: ComponentFixture<DispatcherBolViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatcherBolViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatcherBolViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

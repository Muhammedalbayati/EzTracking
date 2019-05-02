import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbgslistComponent } from './pbgslist.component';

describe('PbgslistComponent', () => {
  let component: PbgslistComponent;
  let fixture: ComponentFixture<PbgslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbgslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbgslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

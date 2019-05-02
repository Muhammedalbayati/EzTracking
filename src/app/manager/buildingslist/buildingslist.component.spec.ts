import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingslistComponent } from './buildingslist.component';

describe('BuildingslistComponent', () => {
  let component: BuildingslistComponent;
  let fixture: ComponentFixture<BuildingslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

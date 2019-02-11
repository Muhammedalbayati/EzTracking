import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolFormComponent } from './bol-form.component';

describe('BolFormComponent', () => {
  let component: BolFormComponent;
  let fixture: ComponentFixture<BolFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

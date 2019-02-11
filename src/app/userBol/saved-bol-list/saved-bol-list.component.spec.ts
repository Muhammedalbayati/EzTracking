import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedBolListComponent } from './saved-bol-list.component';

describe('SavedBolListComponent', () => {
  let component: SavedBolListComponent;
  let fixture: ComponentFixture<SavedBolListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedBolListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedBolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

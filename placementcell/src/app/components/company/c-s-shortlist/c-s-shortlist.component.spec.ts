import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSShortlistComponent } from './c-s-shortlist.component';

describe('CSShortlistComponent', () => {
  let component: CSShortlistComponent;
  let fixture: ComponentFixture<CSShortlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSShortlistComponent]
    });
    fixture = TestBed.createComponent(CSShortlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

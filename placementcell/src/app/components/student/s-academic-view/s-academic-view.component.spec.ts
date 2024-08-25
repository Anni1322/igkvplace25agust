import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SAcademicViewComponent } from './s-academic-view.component';

describe('SAcademicViewComponent', () => {
  let component: SAcademicViewComponent;
  let fixture: ComponentFixture<SAcademicViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SAcademicViewComponent]
    });
    fixture = TestBed.createComponent(SAcademicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SAcademicDetailsComponent } from './s-academic-details.component';

describe('SAcademicDetailsComponent', () => {
  let component: SAcademicDetailsComponent;
  let fixture: ComponentFixture<SAcademicDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SAcademicDetailsComponent]
    });
    fixture = TestBed.createComponent(SAcademicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

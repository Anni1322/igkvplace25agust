import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AStudentViewComponent } from './a-student-view.component';

describe('AStudentViewComponent', () => {
  let component: AStudentViewComponent;
  let fixture: ComponentFixture<AStudentViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AStudentViewComponent]
    });
    fixture = TestBed.createComponent(AStudentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

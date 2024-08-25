import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStudentSliderComponent } from './top-student-slider.component';

describe('TopStudentSliderComponent', () => {
  let component: TopStudentSliderComponent;
  let fixture: ComponentFixture<TopStudentSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopStudentSliderComponent]
    });
    fixture = TestBed.createComponent(TopStudentSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

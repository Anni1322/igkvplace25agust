import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentragistrationComponentComponent } from './studentragistration-component.component';

describe('StudentragistrationComponentComponent', () => {
  let component: StudentragistrationComponentComponent;
  let fixture: ComponentFixture<StudentragistrationComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentragistrationComponentComponent]
    });
    fixture = TestBed.createComponent(StudentragistrationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

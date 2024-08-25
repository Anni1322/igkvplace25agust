import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ACVacancyListComponent } from './a-c-vacancy-list.component';

describe('ACVacancyListComponent', () => {
  let component: ACVacancyListComponent;
  let fixture: ComponentFixture<ACVacancyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ACVacancyListComponent]
    });
    fixture = TestBed.createComponent(ACVacancyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

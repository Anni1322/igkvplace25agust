import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ACVacancyListActionComponent } from './a-c-vacancy-list-action.component';

describe('ACVacancyListActionComponent', () => {
  let component: ACVacancyListActionComponent;
  let fixture: ComponentFixture<ACVacancyListActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ACVacancyListActionComponent]
    });
    fixture = TestBed.createComponent(ACVacancyListActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

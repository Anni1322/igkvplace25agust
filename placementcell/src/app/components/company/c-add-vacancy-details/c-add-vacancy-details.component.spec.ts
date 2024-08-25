import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAddVacancyDetailsComponent } from './c-add-vacancy-details.component';

describe('CAddVacancyDetailsComponent', () => {
  let component: CAddVacancyDetailsComponent;
  let fixture: ComponentFixture<CAddVacancyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CAddVacancyDetailsComponent]
    });
    fixture = TestBed.createComponent(CAddVacancyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

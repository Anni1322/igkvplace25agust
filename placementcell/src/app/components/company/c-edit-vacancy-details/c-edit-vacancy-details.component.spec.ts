import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEditVacancyDetailsComponent } from './c-edit-vacancy-details.component';

describe('CEditVacancyDetailsComponent', () => {
  let component: CEditVacancyDetailsComponent;
  let fixture: ComponentFixture<CEditVacancyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CEditVacancyDetailsComponent]
    });
    fixture = TestBed.createComponent(CEditVacancyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

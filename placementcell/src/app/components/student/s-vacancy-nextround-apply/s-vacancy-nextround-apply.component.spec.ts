import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SVacancyNextroundApplyComponent } from './s-vacancy-nextround-apply.component';

describe('SVacancyNextroundApplyComponent', () => {
  let component: SVacancyNextroundApplyComponent;
  let fixture: ComponentFixture<SVacancyNextroundApplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SVacancyNextroundApplyComponent]
    });
    fixture = TestBed.createComponent(SVacancyNextroundApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SVacancyApplyComponent } from './s-vacancy-apply.component';

describe('SVacancyApplyComponent', () => {
  let component: SVacancyApplyComponent;
  let fixture: ComponentFixture<SVacancyApplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SVacancyApplyComponent]
    });
    fixture = TestBed.createComponent(SVacancyApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

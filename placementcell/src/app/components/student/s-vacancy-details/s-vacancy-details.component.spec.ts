import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SVacancyDetailsComponent } from './s-vacancy-details.component';

describe('SVacancyDetailsComponent', () => {
  let component: SVacancyDetailsComponent;
  let fixture: ComponentFixture<SVacancyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SVacancyDetailsComponent]
    });
    fixture = TestBed.createComponent(SVacancyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

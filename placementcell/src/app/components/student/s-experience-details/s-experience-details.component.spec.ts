import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SExperienceDetailsComponent } from './s-experience-details.component';

describe('SExperienceDetailsComponent', () => {
  let component: SExperienceDetailsComponent;
  let fixture: ComponentFixture<SExperienceDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SExperienceDetailsComponent]
    });
    fixture = TestBed.createComponent(SExperienceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

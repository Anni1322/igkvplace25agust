import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SExperienceViewComponent } from './s-experience-view.component';

describe('SExperienceViewComponent', () => {
  let component: SExperienceViewComponent;
  let fixture: ComponentFixture<SExperienceViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SExperienceViewComponent]
    });
    fixture = TestBed.createComponent(SExperienceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

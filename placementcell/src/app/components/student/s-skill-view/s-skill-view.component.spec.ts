import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSkillViewComponent } from './s-skill-view.component';

describe('SSkillViewComponent', () => {
  let component: SSkillViewComponent;
  let fixture: ComponentFixture<SSkillViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SSkillViewComponent]
    });
    fixture = TestBed.createComponent(SSkillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

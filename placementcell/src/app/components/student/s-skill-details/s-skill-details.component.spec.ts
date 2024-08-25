import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSkillDetailsComponent } from './s-skill-details.component';

describe('SSkillDetailsComponent', () => {
  let component: SSkillDetailsComponent;
  let fixture: ComponentFixture<SSkillDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SSkillDetailsComponent]
    });
    fixture = TestBed.createComponent(SSkillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

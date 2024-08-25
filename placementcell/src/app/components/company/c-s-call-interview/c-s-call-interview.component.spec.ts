import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSCallInterviewComponent } from './c-s-call-interview.component';

describe('CSCallInterviewComponent', () => {
  let component: CSCallInterviewComponent;
  let fixture: ComponentFixture<CSCallInterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSCallInterviewComponent]
    });
    fixture = TestBed.createComponent(CSCallInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

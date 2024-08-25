import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASApplicationComponent } from './a-s-application.component';

describe('ASApplicationComponent', () => {
  let component: ASApplicationComponent;
  let fixture: ComponentFixture<ASApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ASApplicationComponent]
    });
    fixture = TestBed.createComponent(ASApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

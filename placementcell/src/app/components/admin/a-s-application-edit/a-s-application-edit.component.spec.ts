import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASApplicationEditComponent } from './a-s-application-edit.component';

describe('ASApplicationEditComponent', () => {
  let component: ASApplicationEditComponent;
  let fixture: ComponentFixture<ASApplicationEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ASApplicationEditComponent]
    });
    fixture = TestBed.createComponent(ASApplicationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

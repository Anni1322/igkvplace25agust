import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSApplicationComponent } from './c-s-application.component';

describe('CSApplicationComponent', () => {
  let component: CSApplicationComponent;
  let fixture: ComponentFixture<CSApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSApplicationComponent]
    });
    fixture = TestBed.createComponent(CSApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

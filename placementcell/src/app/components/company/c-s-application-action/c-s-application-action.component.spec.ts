import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSApplicationActionComponent } from './c-s-application-action.component';

describe('CSApplicationActionComponent', () => {
  let component: CSApplicationActionComponent;
  let fixture: ComponentFixture<CSApplicationActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSApplicationActionComponent]
    });
    fixture = TestBed.createComponent(CSApplicationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

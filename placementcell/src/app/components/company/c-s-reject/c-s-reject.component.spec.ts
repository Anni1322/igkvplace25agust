import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSRejectComponent } from './c-s-reject.component';

describe('CSRejectComponent', () => {
  let component: CSRejectComponent;
  let fixture: ComponentFixture<CSRejectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSRejectComponent]
    });
    fixture = TestBed.createComponent(CSRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

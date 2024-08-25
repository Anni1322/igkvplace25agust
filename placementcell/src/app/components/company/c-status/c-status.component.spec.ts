import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CStatusComponent } from './c-status.component';

describe('CStatusComponent', () => {
  let component: CStatusComponent;
  let fixture: ComponentFixture<CStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CStatusComponent]
    });
    fixture = TestBed.createComponent(CStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

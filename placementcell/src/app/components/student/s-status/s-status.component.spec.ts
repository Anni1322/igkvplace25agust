import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SStatusComponent } from './s-status.component';

describe('SStatusComponent', () => {
  let component: SStatusComponent;
  let fixture: ComponentFixture<SStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SStatusComponent]
    });
    fixture = TestBed.createComponent(SStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

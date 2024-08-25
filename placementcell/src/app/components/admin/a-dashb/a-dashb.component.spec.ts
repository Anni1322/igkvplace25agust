import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADashbComponent } from './a-dashb.component';

describe('ADashbComponent', () => {
  let component: ADashbComponent;
  let fixture: ComponentFixture<ADashbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ADashbComponent]
    });
    fixture = TestBed.createComponent(ADashbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

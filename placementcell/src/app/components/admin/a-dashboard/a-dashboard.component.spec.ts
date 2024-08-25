import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADashboardComponent } from './a-dashboard.component';

describe('ADashboardComponent', () => {
  let component: ADashboardComponent;
  let fixture: ComponentFixture<ADashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ADashboardComponent]
    });
    fixture = TestBed.createComponent(ADashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

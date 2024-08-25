import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySliderComponent } from './company-slider.component';

describe('CompanySliderComponent', () => {
  let component: CompanySliderComponent;
  let fixture: ComponentFixture<CompanySliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanySliderComponent]
    });
    fixture = TestBed.createComponent(CompanySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

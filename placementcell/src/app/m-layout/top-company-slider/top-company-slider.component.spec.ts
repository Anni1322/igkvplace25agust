import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCompanySliderComponent } from './top-company-slider.component';

describe('TopCompanySliderComponent', () => {
  let component: TopCompanySliderComponent;
  let fixture: ComponentFixture<TopCompanySliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopCompanySliderComponent]
    });
    fixture = TestBed.createComponent(TopCompanySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

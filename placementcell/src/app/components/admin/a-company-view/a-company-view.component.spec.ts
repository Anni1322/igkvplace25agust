import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ACompanyViewComponent } from './a-company-view.component';

describe('ACompanyViewComponent', () => {
  let component: ACompanyViewComponent;
  let fixture: ComponentFixture<ACompanyViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ACompanyViewComponent]
    });
    fixture = TestBed.createComponent(ACompanyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

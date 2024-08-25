import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyregistrationComponentComponent } from './companyregistration-component.component';

describe('CompanyregistrationComponentComponent', () => {
  let component: CompanyregistrationComponentComponent;
  let fixture: ComponentFixture<CompanyregistrationComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyregistrationComponentComponent]
    });
    fixture = TestBed.createComponent(CompanyregistrationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CBasicDetailsComponent } from './c-basic-details.component';

describe('CBasicDetailsComponent', () => {
  let component: CBasicDetailsComponent;
  let fixture: ComponentFixture<CBasicDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CBasicDetailsComponent]
    });
    fixture = TestBed.createComponent(CBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

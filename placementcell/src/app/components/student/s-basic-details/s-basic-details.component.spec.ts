import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SBasicDetailsComponent } from './s-basic-details.component';

describe('SBasicDetailsComponent', () => {
  let component: SBasicDetailsComponent;
  let fixture: ComponentFixture<SBasicDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SBasicDetailsComponent]
    });
    fixture = TestBed.createComponent(SBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

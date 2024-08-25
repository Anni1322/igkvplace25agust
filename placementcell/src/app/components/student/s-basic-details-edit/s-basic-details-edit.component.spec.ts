import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SBasicDetailsEditComponent } from './s-basic-details-edit.component';

describe('SBasicDetailsEditComponent', () => {
  let component: SBasicDetailsEditComponent;
  let fixture: ComponentFixture<SBasicDetailsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SBasicDetailsEditComponent]
    });
    fixture = TestBed.createComponent(SBasicDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

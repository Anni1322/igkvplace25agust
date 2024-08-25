import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SProfileEditComponent } from './s-profile-edit.component';

describe('SProfileEditComponent', () => {
  let component: SProfileEditComponent;
  let fixture: ComponentFixture<SProfileEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SProfileEditComponent]
    });
    fixture = TestBed.createComponent(SProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

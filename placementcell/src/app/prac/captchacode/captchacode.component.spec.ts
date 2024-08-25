import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchacodeComponent } from './captchacode.component';

describe('CaptchacodeComponent', () => {
  let component: CaptchacodeComponent;
  let fixture: ComponentFixture<CaptchacodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaptchacodeComponent]
    });
    fixture = TestBed.createComponent(CaptchacodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

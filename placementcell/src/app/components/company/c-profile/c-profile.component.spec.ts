import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CProfileComponent } from './c-profile.component';

describe('CProfileComponent', () => {
  let component: CProfileComponent;
  let fixture: ComponentFixture<CProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CProfileComponent]
    });
    fixture = TestBed.createComponent(CProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

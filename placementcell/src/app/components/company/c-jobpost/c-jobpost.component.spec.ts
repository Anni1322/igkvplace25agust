import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CJobpostComponent } from './c-jobpost.component';

describe('CJobpostComponent', () => {
  let component: CJobpostComponent;
  let fixture: ComponentFixture<CJobpostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CJobpostComponent]
    });
    fixture = TestBed.createComponent(CJobpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

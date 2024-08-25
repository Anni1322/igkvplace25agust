import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CHeaderComponent } from './c-header.component';

describe('CHeaderComponent', () => {
  let component: CHeaderComponent;
  let fixture: ComponentFixture<CHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CHeaderComponent]
    });
    fixture = TestBed.createComponent(CHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

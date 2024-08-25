import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SJoblistComponent } from './s-joblist.component';

describe('SJoblistComponent', () => {
  let component: SJoblistComponent;
  let fixture: ComponentFixture<SJoblistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SJoblistComponent]
    });
    fixture = TestBed.createComponent(SJoblistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

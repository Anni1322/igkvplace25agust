import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMainComponent } from './s-main.component';

describe('SMainComponent', () => {
  let component: SMainComponent;
  let fixture: ComponentFixture<SMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SMainComponent]
    });
    fixture = TestBed.createComponent(SMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

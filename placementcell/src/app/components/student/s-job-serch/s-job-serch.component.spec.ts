import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SJobSerchComponent } from './s-job-serch.component';

describe('SJobSerchComponent', () => {
  let component: SJobSerchComponent;
  let fixture: ComponentFixture<SJobSerchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SJobSerchComponent]
    });
    fixture = TestBed.createComponent(SJobSerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

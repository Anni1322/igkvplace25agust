import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemComponent } from './homem.component';

describe('HomemComponent', () => {
  let component: HomemComponent;
  let fixture: ComponentFixture<HomemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomemComponent]
    });
    fixture = TestBed.createComponent(HomemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

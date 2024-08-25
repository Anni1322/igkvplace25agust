import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SAplicationComponent } from './s-aplication.component';

describe('SAplicationComponent', () => {
  let component: SAplicationComponent;
  let fixture: ComponentFixture<SAplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SAplicationComponent]
    });
    fixture = TestBed.createComponent(SAplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSSelectedComponent } from './c-s-selected.component';

describe('CSSelectedComponent', () => {
  let component: CSSelectedComponent;
  let fixture: ComponentFixture<CSSelectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CSSelectedComponent]
    });
    fixture = TestBed.createComponent(CSSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

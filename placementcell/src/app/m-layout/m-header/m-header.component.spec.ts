import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MHeaderComponent } from './m-header.component';

describe('MHeaderComponent', () => {
  let component: MHeaderComponent;
  let fixture: ComponentFixture<MHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MHeaderComponent]
    });
    fixture = TestBed.createComponent(MHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

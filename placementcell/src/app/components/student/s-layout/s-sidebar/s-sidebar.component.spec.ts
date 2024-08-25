import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSidebarComponent } from './s-sidebar.component';

describe('SSidebarComponent', () => {
  let component: SSidebarComponent;
  let fixture: ComponentFixture<SSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SSidebarComponent]
    });
    fixture = TestBed.createComponent(SSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

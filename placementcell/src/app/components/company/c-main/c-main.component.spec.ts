import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMainComponent } from './c-main.component';

describe('CMainComponent', () => {
  let component: CMainComponent;
  let fixture: ComponentFixture<CMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CMainComponent]
    });
    fixture = TestBed.createComponent(CMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

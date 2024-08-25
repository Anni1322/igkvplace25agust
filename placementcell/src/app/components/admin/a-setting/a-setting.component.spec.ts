import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASettingComponent } from './a-setting.component';

describe('ASettingComponent', () => {
  let component: ASettingComponent;
  let fixture: ComponentFixture<ASettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ASettingComponent]
    });
    fixture = TestBed.createComponent(ASettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

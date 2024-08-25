import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFileuploadComponent } from './c-fileupload.component';

describe('CFileuploadComponent', () => {
  let component: CFileuploadComponent;
  let fixture: ComponentFixture<CFileuploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CFileuploadComponent]
    });
    fixture = TestBed.createComponent(CFileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

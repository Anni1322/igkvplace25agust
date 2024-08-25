import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFileuploadsComponent } from './c-fileuploads.component';

describe('CFileuploadsComponent', () => {
  let component: CFileuploadsComponent;
  let fixture: ComponentFixture<CFileuploadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CFileuploadsComponent]
    });
    fixture = TestBed.createComponent(CFileuploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

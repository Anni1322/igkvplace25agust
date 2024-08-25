import { TestBed } from '@angular/core/testing';

import { CServiceService } from './c-service.service';

describe('CServiceService', () => {
  let service: CServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

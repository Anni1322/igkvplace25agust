import { TestBed } from '@angular/core/testing';

import { httpInterceptor } from './http.interceptor';

describe('HttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      httpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: httpInterceptor = TestBed.inject(httpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

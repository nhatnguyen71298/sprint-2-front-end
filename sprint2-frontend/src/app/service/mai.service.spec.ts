import { TestBed } from '@angular/core/testing';

import { MaiService } from './mai.service';

describe('MaiService', () => {
  let service: MaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

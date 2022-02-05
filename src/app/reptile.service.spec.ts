import { TestBed } from '@angular/core/testing';

import { ReptileService } from './reptile.service';

describe('ReptileService', () => {
  let service: ReptileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReptileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AcSocketService } from './ac-socket.service';

describe('AcSocketService', () => {
  let service: AcSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

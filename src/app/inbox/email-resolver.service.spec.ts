import { TestBed } from '@angular/core/testing';

import { EmailResolverService } from './EmailResolverService';

describe('EmailResolverService', () => {
  let service: EmailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

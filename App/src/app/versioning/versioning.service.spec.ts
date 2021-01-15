import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { VersioningService } from './versioning.service';

describe('VersioningService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VersioningService, HttpClientTestingModule],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
  });

  it('HTTP Client should works', inject([VersioningService], (service: VersioningService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DatasetsService } from './datasets.service';

describe('DatasetsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatasetsService, HttpClientTestingModule],
      imports: [HttpClientTestingModule],
    });
  });

  it('HTTP Client should works', inject([DatasetsService], (service: DatasetsService) => {
    expect(service).toBeTruthy();
  }));
});

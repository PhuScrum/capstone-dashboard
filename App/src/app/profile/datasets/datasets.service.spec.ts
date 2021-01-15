import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DatasetsService } from './datasets.service';

describe('DatasetsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatasetsService, HttpClientTestingModule],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
  });

  it('HTTP Client should works', inject([DatasetsService], (service: DatasetsService) => {
    expect(service).toBeTruthy();
  }));
});

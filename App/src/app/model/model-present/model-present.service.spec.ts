import { TestBed } from '@angular/core/testing';

import { ModelPresentService } from './model-present.service';

describe('ModelPresentService', () => {
  let service: ModelPresentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelPresentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

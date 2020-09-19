import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ModelService } from './model.service';

describe('ModelService', () => {
  let service: ModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ModelService]
    });
    service = TestBed.inject(ModelService);
  });

  it('should create the model services', () => {
    expect(service).toBeTruthy();
  });
});

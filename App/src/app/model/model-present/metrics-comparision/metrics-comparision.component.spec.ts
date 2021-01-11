import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MetricsComparisionComponent } from './metrics-comparision.component';

describe('MetricsComparisionComponent', () => {
  let component: MetricsComparisionComponent;
  let fixture: ComponentFixture<MetricsComparisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetricsComparisionComponent],
      imports: [HttpClientTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Metrics comparision should be truthy', () => {
    expect(component).toBeTruthy();
  });
});
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsComparisionComponent } from './metrics-comparision.component';

describe('MetricsComparisionComponent', () => {
  let component: MetricsComparisionComponent;
  let fixture: ComponentFixture<MetricsComparisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsComparisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

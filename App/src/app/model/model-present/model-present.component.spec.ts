import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ModelPresentComponent } from './model-present.component';

describe('ModelPresentComponent', () => {
  let component: ModelPresentComponent;
  let fixture: ComponentFixture<ModelPresentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPresentComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the model present', () => expect(component).toBeTruthy());

  it('should text show rmse always greater than 0', () => expect(component.r2ScoreShow).toBeGreaterThanOrEqual(0));

  it('should create filter present', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('filter-present')).toBeTruthy();
  });

  it('should render chart', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.demo-chart')).toBeTruthy();
  });

  it('should render R2 percent', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.mt-3 div p').textContent).toEqual('R2');
  });

  it('should render R2 percent & progress', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('nz-progress')).toBeTruthy();
  });

});

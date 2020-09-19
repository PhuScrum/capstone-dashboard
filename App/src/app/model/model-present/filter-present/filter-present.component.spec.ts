import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FilterPresentComponent } from './filter-present.component';

describe('FilterPresentComponent', () => {
  let component: FilterPresentComponent;
  let fixture: ComponentFixture<FilterPresentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPresentComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the filter present component', () => {
    expect(component).toBeTruthy();
  });
});

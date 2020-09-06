import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPresentComponent } from './filter-present.component';

describe('FilterPresentComponent', () => {
  let component: FilterPresentComponent;
  let fixture: ComponentFixture<FilterPresentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPresentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

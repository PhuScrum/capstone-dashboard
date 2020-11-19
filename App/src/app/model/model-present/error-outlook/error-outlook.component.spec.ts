import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ErrorOutlookComponent } from './error-outlook.component';

describe('ErrorOutlookComponent', () => {
  let component: ErrorOutlookComponent;
  let fixture: ComponentFixture<ErrorOutlookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorOutlookComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorOutlookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the error outlook component', () => {
    expect(component).toBeTruthy();
  });
});

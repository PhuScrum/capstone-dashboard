import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorOutlookComponent } from './error-outlook.component';

describe('ErrorOutlookComponent', () => {
  let component: ErrorOutlookComponent;
  let fixture: ComponentFixture<ErrorOutlookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorOutlookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorOutlookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

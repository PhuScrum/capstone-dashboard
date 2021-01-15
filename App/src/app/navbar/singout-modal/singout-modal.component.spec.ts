import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingoutModalComponent } from './singout-modal.component';

describe('SingoutModalComponent', () => {
  let component: SingoutModalComponent;
  let fixture: ComponentFixture<SingoutModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingoutModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersioningPageComponent } from './versioning-page.component';

describe('VersioningPageComponent', () => {
  let component: VersioningPageComponent;
  let fixture: ComponentFixture<VersioningPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersioningPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersioningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Versioning Page', () => {
    expect(component).toBeTruthy();
  });
});

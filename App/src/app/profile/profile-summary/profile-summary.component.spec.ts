import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileSummaryComponent } from './profile-summary.component';

describe('ProfileSummaryComponent', () => {
  let component: ProfileSummaryComponent;
  let fixture: ComponentFixture<ProfileSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientTestingModule],
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ProfileSummaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Profile summary component should be created', () => {
    expect(component).toBeTruthy();
  });
});

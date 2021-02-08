import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DatasetsComponent } from './datasets.component';

describe('ProfileDatasetsComponent', () => {
  let component: DatasetsComponent;
  let fixture: ComponentFixture<DatasetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Profile Dataset component', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DatasetVersioningComponent } from './datasets.component';

describe('DatasetVersioningComponent', () => {
  let component: DatasetVersioningComponent;
  let fixture: ComponentFixture<DatasetVersioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetVersioningComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetVersioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Datasets components should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatasetsComponent } from './datasets.component';

describe('DatasetsComponent', () => {
  let component: DatasetsComponent;
  let fixture: ComponentFixture<DatasetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetsComponent],
      imports: [HttpClientTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Datasets components should be created', () => {
    expect(component).toBeTruthy();
  });
});

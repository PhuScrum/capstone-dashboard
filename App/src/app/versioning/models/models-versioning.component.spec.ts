import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ModelsVersioningComponent } from './models-versioning.component';

describe('ModelsVersioningComponents', () => {
  let component: ModelsVersioningComponent;
  let fixture: ComponentFixture<ModelsVersioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsVersioningComponent ],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsVersioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Models Versioning Components should be created', () => {
    expect(component).toBeTruthy();
  });
});

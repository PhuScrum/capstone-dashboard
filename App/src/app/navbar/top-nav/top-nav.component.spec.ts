import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavComponent } from './top-nav.component';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;

  // console.log('component: ', component);
  // console.log('fixture: ', fixture);
  const increaseHeight = (componentRef) => {
    const { nativeElement = {} } = componentRef || {};
    const newEleRef = { ...componentRef };
    if (nativeElement && nativeElement.style) {
      newEleRef.nativeElement.style.height = 1000;
    }
    return newEleRef;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopNavComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the top navbar component', () => {
    expect(component).toBeTruthy();
  });
});

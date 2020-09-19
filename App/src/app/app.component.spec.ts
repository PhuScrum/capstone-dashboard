import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { ModelModule } from './model/model.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        NavbarModule,
        ModelModule,
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => expect(component).toBeTruthy());

  it(`should have as title 'capstone-agtuary-dashboard'`, () => expect(component.title).toEqual('capstone-agtuary-dashboard'));

  // it('should render title', () => {
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('capstone-agtuary-dashboard app is running!');
  // });
});

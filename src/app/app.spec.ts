import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
  it('should render router-outlet with classes', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div');
    expect(div).toBeTruthy();
    expect(div?.classList.contains('bg-slate-600')).toBe(true);
  });

  it('should render buy me a beer link', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const secondDivInFile = compiled.querySelector('div + div');
    expect(secondDivInFile).toBeTruthy();
    const divContained = secondDivInFile?.querySelector('div');
    const link = divContained?.querySelector('a');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('https://www.buymeacoffee.com/scottwindon');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('title')).toBe('Buy me a beer');
    const img = link?.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg');
  });

});

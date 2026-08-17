import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view';
import { Component } from '@angular/core';

@Component({
  selector: 'calculator',
  template: '<div>Mock Calculator</div>',
})
class MockCalculatorComponent {}

describe('CalculatorViewComponent', () => {
  let component: CalculatorViewComponent;
  let fixture: ComponentFixture<CalculatorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    })
      .overrideComponent(CalculatorViewComponent, {
        set: {
          imports: [MockCalculatorComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the calculator component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled.innerHTML);
    expect(compiled.querySelector('calculator')).toBeTruthy();
  });

  it('should contain the specific CSS classes in the wrapper div', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const divElement = compiled.querySelector('div');

    const expectedClasses =
      'clase-personalizada'.split(
        ' '
      );

    console.log('divElement classes:', divElement?.classList);

    expectedClasses.forEach((className) => {
      expect(divElement?.classList).toContain(className);
    });
  });
});



import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CalculatorButton } from './calculator-button';

// Mock del componente Calculator para evitar dependencias externas y centrarnos en las pruebas del componente CalculatorView.
@Component({
  selector: 'calculator',
  template: '<div>Mock Calculator</div>',
})
class MockCalculatorComponent {}

describe('CalculatorButton', () => {
  let component: CalculatorButton;
  let fixture: ComponentFixture<CalculatorButton>;

  // No necesito que renderice el componente real de Calculator, así que creo un mock para él. Esto permite que las pruebas se centren en el componente CalculatorView sin depender de la implementación del componente Calculator.
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorButton],
    });

    fixture = TestBed.createComponent(CalculatorButton);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render the calculator component', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   console.log(compiled.innerHTML);
  //   expect(compiled.querySelector('calculator')).toBeTruthy();
  // });

  // it('should contain the specific CSS classes in the wrapper div', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const divElement = compiled.querySelector('div');

  //   const expectedClasses = 'clase-personalizada'.split(' ');

  //   console.log('divElement classes:', divElement?.classList);

  //   expectedClasses.forEach((className) => {
  //     expect(divElement?.classList).toContain(className);
  //   });
  // });

  it('should apply w-1/4 double size is false', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled?.classList.value).toContain('w-1/4');
  });

  it('should apply w-2/4 double size is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    console.log('compiled?.classList.value:', compiled?.classList.value);
    expect(compiled?.classList.value).toContain('w-2/4');
  });

  it('should apply is-command class when isCommand is true', () => {
    fixture.componentRef.setInput('isCommand', true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    console.log('compiled?.classList.value:', compiled?.classList.value);
    expect(compiled?.classList.value).toContain('bg-indigo-700');
    expect(compiled?.classList.value).toContain('bg-opacity-20');
    expect(compiled?.classList.value).toContain('is-command');
  });
});

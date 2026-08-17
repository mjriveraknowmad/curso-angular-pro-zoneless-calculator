import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view';
import { Component } from '@angular/core';

// Mock del componente Calculator para evitar dependencias externas y centrarnos en las pruebas del componente CalculatorView.
@Component({
  selector: 'calculator',
  template: '<div>Mock Calculator</div>',
})
class MockCalculatorComponent {}

describe('CalculatorViewComponent', () => {
  let component: CalculatorViewComponent;
  let fixture: ComponentFixture<CalculatorViewComponent>;

  // No necesito que renderice el componente real de Calculator, así que creo un mock para él. Esto permite que las pruebas se centren en el componente CalculatorView sin depender de la implementación del componente Calculator.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    })
      .overrideComponent(CalculatorViewComponent, {
        // Aquí decimos que queremos reemplazar el componente real de Calculator, CalculatorViewComponent,  con nuestro mock.
        set: {
          imports: [MockCalculatorComponent], // Aquí reemplazo el componente real de Calculator con el mock que creé.
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

    const expectedClasses = 'clase-personalizada'.split(' ');

    console.log('divElement classes:', divElement?.classList);

    expectedClasses.forEach((className) => {
      expect(divElement?.classList).toContain(className);
    });
  });
});

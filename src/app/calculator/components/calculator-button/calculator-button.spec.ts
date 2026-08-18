import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CalculatorButton } from './calculator-button';


// Mock para la última prueba, donde se comprueba el contenido proyectado. Este componente de prueba sirve como contenedor para el componente CalculatorButton y permite verificar si el contenido proyectado se muestra correctamente.
@Component({
  imports: [CalculatorButton],
  template:'<calculator-button><span class="projected-content"> 7 </span></calculator-button>'
})
class HostFakeUseCalculatorButton {}

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

  it('should emit onClick when handleClick is called', async () => {
    const spy = vitest.spyOn(component.onClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.innerText = '9';
    button.click();

    expect(spy).toHaveBeenCalledWith('9');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set isPressed to true and then false when keyboardPressedStyle is called with matching key', async (done) => {
    component.contentValue()!.nativeElement.innerText = '9';//es como fixture.nativeElement.innerText
    component.keyboardPressedStyle('9');

    expect(component.isPressed()).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(component.isPressed()).toBe(false);
  });

  it('should NOT set isPressed if key does not match', () => {
    component.contentValue()!.nativeElement.innerText = '8';//es como fixture.nativeElement.innerText
    component.keyboardPressedStyle('9');

    expect(component.isPressed()).toBe(false);
  });

  it('should display projected content', () => {
    // @Component({
    //   imports: [CalculatorButton],
    //   template:'<calculator-button><span class="projected-content"> 7 </span></calculator-button>'
    // })
    // class HostFakeUseCalculatorButton {}

    const hostFixture = TestBed.createComponent(HostFakeUseCalculatorButton);
    hostFixture.detectChanges();

    const projectedContent = hostFixture.nativeElement.querySelector('.projected-content');
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.textContent.trim()).toBe('7');
  });
});

import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Calculator } from './calculator';
import { By } from '@angular/platform-browser';
import { CalculatorButton } from '../calculator-button/calculator-button';
import { CalculatorService } from '@/calculator/services/calculator';

// Mock para el servicio CalculatorService, que se inyecta en el componente Calculator. Este mock permite simular el comportamiento del servicio sin depender de su implementación real, facilitando así las pruebas unitarias del componente.
class MockCalculatorService {
  resultText = signal('100');
  subResultText = signal('20');
  lastOperator = signal('-');
  constructNumber = vi.fn();
}

describe('Calculator', () => {
  let component: Calculator;
  let fixture: ComponentFixture<Calculator>;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(() => {
    mockCalculatorService = new MockCalculatorService();

    TestBed.configureTestingModule({
      imports: [Calculator],
      providers: [
        {
          provide: CalculatorService,
          useValue: mockCalculatorService,
        },
      ],
    });

    fixture = TestBed.createComponent(Calculator);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Importante
  });

  it('should create', () => {
    // const compiled = fixture.nativeElement as HTMLElement;
    // // console.log(compiled.innerHTML);
    // console.log({
    //   resultText: component.resultText(),
    //   subResultText: component.subResultText(),
    //   lastOperator: component.lastOperator(),
    // });

    expect(component).toBeTruthy();
  });

  it('should have initial values from service', () => {
    expect(component.resultText()).toBe('100');
    expect(component.subResultText()).toBe('20');
    expect(component.lastOperator()).toBe('-');
  });

  it('should display values in the template', () => {
    mockCalculatorService.resultText.set('50');
    mockCalculatorService.subResultText.set('10');
    mockCalculatorService.lastOperator.set('-');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const resultTextElement = compiled.querySelector('[test-id="result-text"]');
    const subResultTextElement = compiled.querySelector('.text-4xl');

    expect(resultTextElement?.innerHTML).toBe('50');
    expect(subResultTextElement?.innerHTML).toContain('10 - ');
  });


  it('should call constructNumber when handleClick is called', () => {
    component.handleClick('5');
    expect(mockCalculatorService.constructNumber).toHaveBeenCalled();
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('5');
  });

  it('should call constructNumber when button is clicked', () => {
    // todo:
    const buttons = fixture.debugElement.queryAll(
      By.directive(CalculatorButton)
    );

    const button = buttons[0];
    button.triggerEventHandler('onClick', 'C');

    expect(buttons.length).toBe(19);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

});

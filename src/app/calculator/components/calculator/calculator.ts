import { Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';
import { CalculatorService } from '@/calculator/services/calculator';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButton],
  templateUrl: './calculator.html',
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
    class: 'max-w-96 overflow-hidden block',
  },
})
export class Calculator {

  public calculatorButtons = viewChildren(CalculatorButton);
  private calculatorSvc = inject(CalculatorService);

  resultText = computed(() => this.calculatorSvc.resultText());
  subResultText = computed(() => this.calculatorSvc.subResultText());
  lastOperator = computed(() => this.calculatorSvc.lastOperator());

  handleClick(key: string) {
    this.calculatorSvc.constructNumber(key);
  }

   handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      X: '*',
      '/': '÷',
      Enter: '=',
    };

    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyValue);
    });
  }
}

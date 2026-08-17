import { Component } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButton],
  templateUrl: './calculator.html',
  host: {
    class: 'max-w-96 overflow-hidden block',
  },
})
export class Calculator {

  handleButtonClick(event: string) {
    console.log('Button clicked:', event);
  }
}

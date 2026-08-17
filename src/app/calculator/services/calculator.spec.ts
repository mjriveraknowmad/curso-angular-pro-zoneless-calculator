import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator';

describe('Calculator', () => {
  let service: CalculatorService;

  // Antes de cada prueba, configuramos el TestBed y obtenemos una instancia del servicio, para no mezclar el estado entre pruebas.
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText, subResultText to "0" when C is pressed', () => {
    service.constructNumber('5');
    console.log('resultText after 5:', service.resultText());
    service.constructNumber('C');
    console.log('resultText after C:', service.resultText());
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('3');
    expect(service.resultText()).toBe('123');
  });

  it('should handle operators correctly', () => {
    // todo:
  });

  it('should calculate result correctly for addition', () => {
    // todo:
  });

  it('should calculate result correctly for subtraction', () => {
    // todo:
  });

  it('should calculate result correctly for multiplication', () => {
    // todo:
  });

  it('should calculate result correctly for division', () => {
    // todo:
  });

  it('should handle decimal point correctly', () => {
    // todo:
  });

  it('should handle decimal point starting with 0', () => {
    // todo:
  });

  it('should handle sign change +/-', () => {
    // todo:
  });

  it('should handle backspace', () => {
    // todo:
  });

  it('should handle backspace with negative numbers', () => {
    // todo:
  });

  it('should handle max length', () => {
    // todo:
  });

  it('should handle invalid input', () => {
    // todo:
  });

  it('should handle negative zero input correctly', () => {
    // todo:
  });
});

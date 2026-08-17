import {
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.html',
  styleUrl: './calculator-button.css',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
    '[class.bg-indigo-700]':'isCommand() || isPressed()',
    '[class.bg-opacity-20]':'isCommand()',
    '[class.bg-opacity-40]':'isPressed()',
    // attribute: 'hola',
    // 'data-size': 'XL',
  },
  // encapsulation: ViewEncapsulation.None,
})
export class CalculatorButton {
  onClick = output<string>();
  contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isPressed = signal(false);

  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  // Comprobar si es un comando en base a las clases aplicadas al botón
  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }

  // @HostBinding('class.w-2/4') get commandStyle() {
  //   return this.isDoubleSize();
  // }

  handleClick() {
    if(!this.contentValue()?.nativeElement){
      return;
    }
    const value = this.contentValue()?.nativeElement.innerText.trim();
    if (value) {
      this.onClick.emit(value);
    }
  }

  public keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);
    console.log('keyboardPressedStyle', { value, key });

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }

}

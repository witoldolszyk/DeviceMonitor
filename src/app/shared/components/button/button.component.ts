import { NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy, input, output, OutputRef } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  label = input<string>();
  type = input<'button' | 'submit' | 'reset'>();
  buttonType = input<'primary' | 'secondary' | 'success' | 'danger' | 'warning'>();

  onClick = output<void>();

  handleClick(): void {
    this.onClick.emit(); 
  }

  get buttonClass(): string {
    switch (this.buttonType()) {
      case 'primary':
        return 'bg-purple-500 hover:bg-purple-700 text-white';
      case 'secondary':
        return 'bg-gray-500 hover:bg-gray-700 text-white';
      case 'success':
        return 'bg-green-500 hover:bg-green-700 text-white';
      case 'danger':
        return 'bg-red-500 hover:bg-red-700 text-white';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-700 text-black';
      default:
        return 'bg-purple-500 hover:bg-purple-700 text-white';
    }
  }
}

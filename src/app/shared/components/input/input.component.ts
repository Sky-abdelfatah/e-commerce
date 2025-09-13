import { Component, Input, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() control: any;
  @Input() typeinput!: string;
  @Input() idinput!: string;
  @Input() lableinput!: string;
  @Input() element: string = 'input';
  flag: boolean = true;
}

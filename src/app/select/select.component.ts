import {Component, computed, effect, input, signal} from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  template: `
    <ul>
        @for(option of options()){
            <li (click)="select(option)">{{option}}</li>
        }

        Selected Option is: {{state().selectedOption()}}
    </ul>
  `,
  styleUrl: './select.component.scss'
})
export class SelectComponent {

  options = input<string[]>([]);
  // selectedOption = signal<string>('');

  state = computed(() => ({
    options: this.options(),
    selectedOption: signal<string>('')
  }))



  select(option: string){
    this.state().selectedOption.set(option);
  }



}

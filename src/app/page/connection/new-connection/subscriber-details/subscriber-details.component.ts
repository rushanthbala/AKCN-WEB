import { Component ,Input,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subscriber-details',
  templateUrl: './subscriber-details.component.html',
  styleUrls: ['./subscriber-details.component.scss']
})
export class SubscriberDetailsComponent  {
  @Input() object:object | any;
  @Output() OnClick = new EventEmitter<any>()

  constructor(private fb: FormBuilder) {}
  inputset: FormGroup | any;
  addEventClick(){
    this.OnClick.emit()
  }
}

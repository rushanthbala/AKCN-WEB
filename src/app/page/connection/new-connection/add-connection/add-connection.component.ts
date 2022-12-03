import { Component ,Input,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.scss']
})
export class AddConnectionComponent {
  @Input() object:object | any;
  @Output() OnClick = new EventEmitter<any>()

  constructor(private fb: FormBuilder) {}
  inputset: FormGroup | any;
  addEventClick(){
    this.OnClick.emit()
  }
}

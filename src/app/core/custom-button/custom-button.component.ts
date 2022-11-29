import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent implements OnInit {
 @Input() text:string | any;
 @Input() btnClass:string | any;
 @Output() OnClick= new EventEmitter<string>() 

  constructor() { }

  ngOnInit(): void {
  }
  emitEvent(){
    this.OnClick.emit()
  }

}

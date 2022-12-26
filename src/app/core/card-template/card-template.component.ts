import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.scss'],
})
export class CardTemplateComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() number: string | undefined;
  @Input() img: Boolean | undefined;
  @Input() color: string | undefined;


  ngOnInit(): void {}
}

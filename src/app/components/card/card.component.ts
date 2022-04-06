import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('title') title = '';
  @Input('artist') artist = '';

  constructor() { }

  ngOnInit(): void {
    this.title = 'Soy YO';
    this.artist = 'Luis Miguel';
  }

}

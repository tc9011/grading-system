import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss']
})
export class CollectComponent implements OnInit {
  date = null;

  constructor() { }

  ngOnInit() {
    this.date = new Date(Date.now());
  }

  getStatus(): void {

  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {fromEvent, interval, timer} from "rxjs";

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // Definition for a stream of values.
    const interval$ = interval(1000);

    interval$.subscribe( val => console.log('Stream 1 => ' + val));

    interval$.subscribe( val => console.log('Stream 2 => ' + val));

    const timer$ = timer(3000, 100);

    timer$.subscribe( val => console.log('Stream 1 => ' + val));

    const click$ = fromEvent(document, 'click');

    click$.subscribe(evt => console.log(evt));

  }

}

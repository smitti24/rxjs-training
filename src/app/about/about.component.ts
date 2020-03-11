import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fromEvent, interval, noop, Observable, timer} from "rxjs";
import {createHttpObservable} from "../common/util";
import {map} from "rxjs/operators";

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

    //Create observable
    const http$ = createHttpObservable('api/courses');

    const courses$ = http$
      .pipe(
        map(res => Object.values(res["payload"]))
      );

    courses$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('completed')
    )

    // Definition for a stream of values.
    // const interval$ = interval(1000);
    //
    // const sub = interval$.subscribe( val => console.log('Stream 1 => ' + val));
    //
    // // Prevents any values from being printed to the console after 5 seconds.
    // setTimeout(() => {
    //   sub.unsubscribe();
    // }, 5000);
    //
    // interval$.subscribe( val => console.log('Stream 2 => ' + val));
    //
    // const timer$ = timer(3000, 100);
    //
    // timer$.subscribe( val => console.log('Stream 1 => ' + val));
    //
    // const click$ = fromEvent(document, 'click');
    //
    // click$.subscribe(
    //   evt => console.log(evt),
    //
    //   err => console.log(err),
    //
    //   () => console.log('completed')
    //
    // );

  }


}

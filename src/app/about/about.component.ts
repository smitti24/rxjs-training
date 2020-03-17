import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {concat, fromEvent, interval, noop, Observable, of, timer, merge, Subject, BehaviorSubject} from "rxjs";
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

    const subject = new BehaviorSubject(0);

    //Emits values of the subject
    const series1$ = subject.asObservable();

    series1$.subscribe((val => console.log("Early sub:" + val)));


    subject.next(1);
    subject.next(2);
    subject.next(3);

    // subject.complete();

    setTimeout(() => {
      series1$.subscribe((val => console.log("Late sub:" + val)));
      subject.next(4);
    }, 3000)


    // const http$ = createHttpObservable('/api/courses');
    //
    // const sub = http$.subscribe(console.log);
    //
    // setTimeout(() => {
    //   sub.unsubscribe();
    // }, 0)
    // const interval1$ = interval(1000);
    // const interval2$ = interval1$.pipe(map(val => val * 10));
    //
    // const results$ = merge(interval1$, interval2$);
    //
    // results$.subscribe(console.log);
    //
    // // Usefull for defining all sorts of observables.
    // // Sequencial concatenations of all values
    //
    //
    // const source1$ = of(1, 2, 3);
    // const source2$ = of(4, 5, 6);
    // const source3$ = of(7,8,9);
    //
    // const result2$ = concat(source1$,source2$,source3$);
    //
    // result2$.subscribe(val => console.log(val));





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

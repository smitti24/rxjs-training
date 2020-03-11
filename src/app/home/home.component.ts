import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from "../common/util";


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Definitions of streams of data.
  public beginnersCourses$: Observable<Course[]>;
  public advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {
      //Create observable
      const http$ = createHttpObservable('api/courses');

      // @ts-ignore
      const courses$: Observable<Course[]> = http$
        .pipe(
          tap( () => console.log('Http request executed')),
          map(res => Object.values(res["payload"])),
          shareReplay()
        );

      this.beginnersCourses$ = http$
        .pipe(
          map(courses => courses
            .filter(course => course.category === 'BEGINNER'))
        );

      this.advancedCourses$ = http$
        .pipe(
          map(courses => courses
            .filter(course => course.category === 'ADVANCED'))
        );

      courses$.subscribe(
        courses => {

        },
        noop,
        () => console.log('completed')
      )


    }

}


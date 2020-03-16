import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delayWhen, finalize, map, retry, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from "../common/util";


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  ngOnInit() {

    const http$ = createHttpObservable('/api/courses');

    // @ts-ignore
    const courses$: Observable<Course[]> = http$
      .pipe(
        // RETHROW ERROR STRATEGY
        // catchError(err => {
        //   console.log("Error occurred", err);
        //
        //   return throwError(err);
        // }),
        // // Called when the observable completes, or when it errors out
        // finalize(() => {
        //   console.log("Finalize executed...");
        // }),
        tap(() => console.log("HTTP request executed")),
        map(res => Object.values(res["payload"]) ),
        shareReplay(),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(2000))
        ))
      );

    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses
          .filter(course => course.category == 'BEGINNER'))
      );

    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses
          .filter(course => course.category == 'ADVANCED'))
      );

  }

}


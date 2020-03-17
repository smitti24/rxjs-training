import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delayWhen, finalize, map, retry, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from "../common/util";
import {StoreService} from "../common/store.service";


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private store: StoreService){

  }

  ngOnInit() {

    const courses$ = this.store.courses$;

    // @ts-ignore
    this.beginnerCourses$ = this.store.selectBeginnerCourses();
    // @ts-ignore
    this.advancedCourses$ = this.store.selectAdvancedCourses();

  }

}


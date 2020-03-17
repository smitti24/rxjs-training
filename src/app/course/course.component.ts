import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, first, take
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, forkJoin} from 'rxjs';
import {Lesson} from '../model/lesson';
import {createHttpObservable} from "../common/util";
import {debug, RxJsLoggingLevel} from "../common/debug";
import {StoreService} from "../common/store.service";


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  public courseId: number;
  public course$: Observable<Course>;
  public lessons$: Observable<Lesson[]>;

  @ViewChild('searchInput', {static: true}) input: ElementRef;

  constructor(private route: ActivatedRoute, private store: StoreService) {


  }

  ngOnInit() {

    this.courseId = this.route.snapshot.params['id'];

    // @ts-ignore
    const course$ = this.store.selectCourseById(this.courseId)
      .pipe(
        take(1)
      );
    const lessons$ = this.loadLessons();

    forkJoin([course$, lessons$])
      .pipe(
        tap(([courses, lessons]) => {
          console.log(courses);
          console.log(lessons);
        })
      );


    this.loadLessons()
      .pipe(
        withLatestFrom(course$)
      )
      .subscribe(lessons => {

      })


  }

  ngAfterViewInit() {


    this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        startWith(''),
        debug(RxJsLoggingLevel.TRACE, " Search "),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.loadLessons(search)),
        debug(RxJsLoggingLevel.DEBUG, " Lessons value "),
      );

  }

  loadLessons(search: string = ''): Observable<Lesson[]> {
    return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
      .pipe(
        map(res => res['payload'])
      );
  }


}

import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject, timer} from "rxjs";
import {Course} from "../model/course";
import {createHttpObservable} from "./util";
import {delayWhen, filter, map, retryWhen, shareReplay, tap} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
  //Allows one single instance of store to be shared in all components its injected into.
  providedIn: 'root'
})
export class StoreService {

  private subject = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[]> = this.subject.asObservable();


  init() {
    const http$ = createHttpObservable('/api/courses');


    http$
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
        map(res => Object.values(res["payload"])),
        // shareReplay(),
        // retryWhen(errors => errors.pipe(
        //   delayWhen(() => timer(2000))
        // ))
      )
      .subscribe(
        // @ts-ignore
        courses => this.subject.next(courses)
      );
  }

  selectBeginnerCourses() {
    return this.filterByCategory('BEGINNER');
  }

  selectAdvancedCourses() {
    return this.filterByCategory('ADVANCED');

  }

  selectCourseById(courseId: number){
    return this.courses$
      .pipe(
        map(courses => courses.find(course => course.id == courseId)),
        filter(course => !!course)
      );
  }

  filterByCategory(category: string) {
    return this.courses$
      .pipe(
        map(courses => courses
          .filter(course => course.category == category))
      );
  }

  public saveCourse(courseId: number, changes): Observable<any> {
    const courses = this.subject.getValue();

    const courseIndex = courses.findIndex(x => x.id === courseId);

    // Create copy of array
    const newCourses = courses.slice(0);

    newCourses[courseIndex] = {
      ...courses[courseIndex],
      ...changes
    };

    this.subject.next(newCourses);

    return fromPromise(fetch(`/api/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }))
  }
}

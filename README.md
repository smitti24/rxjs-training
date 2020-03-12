# rxjs-training
Rxjs training and notes

**Stream of values:**
- Every click you do in an application will be a stream of values.
1. setInterval
    - Emits multiple values.
    - Multi value streams.
2. Click events
    - Multi value streams.
3. setTimeout
    - Only emits one value when it completes.

**Javascript Intervals:**
Code that is periodically executed by runtime in order to perform a certain task.
eg: long polling in the background. 

**RxJs:**
- Reactive Extensions For Javascript.
    - Library that makes it simple to combine streams of values together.
    - Extension to Javascript.

**Rxjs Observable**
- Observable will only become a stream if it is subscribed too.
- Blueprint of a stream.
- If defined does not trigger a request.
- Subscribe:
    - next
    - error
    - completed
    - noop
        - no operation
    
- Promise:
    - Gets immediately executed once its defined.
    
**Map**
- Transforms the items emitted by an Observable by applying a function to each item.

**Pipe**
- Allows us to chain multiple rxjs operators in order to produce a new observable.

**Imperative Design**
- Nesting subscribe calls together.
```
courses$.subscribe(
          courses => {
            this.beginnersCourses = courses.filter(course => course.category === 'BEGINNER');
            this.advancedCourses = courses.filter(course => course.category === 'ADVANCED');
          },
          noop,
          () => console.log('completed')
        )
```

**Reactive Design**
- Dont use subscribe method
- Define streams of values using observables and rxjs functions.
- Subscription to the observable happens on the template.

```      
this.beginnersCourses$ = http$
           .pipe(
             map(courses => courses
               .filter(course => course.category === 'BEGINNER'))
           );
```

**ShareReplay**
- Share the execution of a stream accross multiple observables.
- This means that only one http call will be fired.
- Http response is passed on to each of the subscribers instead of executing the same http request again.
- We don't want our application to do multiple requests to fetch the same data
- To handle http requests as rxjs streams.
- When you have two http requests that are subscribed to the same observable, 
-Shares the execution of the stream across multiple subscribers
    -Thereby avoiding the default observable behaviour, that creates a complete new stream by subscription

**tap**
- Used to produce side effects in our observable chain.
- When we want to update something outside the observable chain

**concatMap**
- Function that turns a value into a observable.
- Allows Observables to perform in sequence, one after the other.
- Takes in a Observable function.
```
     ngOnInit() {
        this.form.valueChanges
          .pipe(
            filter(() => this.form.valid),
            concatMap(changes => this.saveCourse(changes))
          )
          .subscribe();
      }
    
      private saveCourse(changes) {
        return fromPromise(
          fetch(`/api/couses/${this.course.id}`, {
            method: 'PUT',
            body: JSON.stringify(changes),
            headers: {
              'content-type': 'application/json',
            }
          }));
      }
```
**merge**
- Take multiple observables, subscribe to all of them, and then take the values of each of these observables
- Ideal for performing async operations in parallel.
- Flattens multiple Observables together by blending their values into one Observable.
- Http requests in parallel.

**mergeMap**
- Maps each value to an Observable, then flattens all these inner Observables.
- Take the values of the source observable, apply a mapping function to it that is going to take the value and produce a new observable from it.
- Does not wait for previous observables to complete first.
- Runs Observables in parallel.
- Will only output a value when the source Observable has completed.

**exhaustMap**
- Merges Observables only if the previous Observable has been completed, else it ignores it.
- Ignores new requests if a request is still being emitted.
- Example: Clicking a save button multiple times.

**AbortController**
- A controller object that allows you to abort one or more Web requests as and when desired.
- .signal
    - Returns a AbortSignal object instance, which can be used to communicate with/abort a DOM request.
- Specified as part of the fetch api.
- Example:
```
const controller = new AbortController();
    const signal = controller.signal;

    //Returns a promise.
    fetch(url, {signal})
```
- When the fetch request is initiated, we pass in the AbortSignal as an option inside the request's options object.
- Now you will be able to call .unsubscribe from the Observable using the http request method.

**debounceTime**
- Emits a value from a source Observable only after a specified time span has passed without any source emission.
- Delay
- Passes only the most recent value from the burst of emissions.

**distinctUntilChanged**
- Ignores same values in the source Observable.

**switchMap**
- Unsubscription Logic
- Projects each source value to an Observable which is merged in the output Observable, emitting only the values from the most recent projected Observable.
- Cancels any ongoing requests and emits the next request, unsubscribes from the Observable and switches to the new Observable.

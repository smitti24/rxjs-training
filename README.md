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

**tap**
- Used to produce side effects in our observable chain.
- When we want to update something outside the observable chain
- 
    


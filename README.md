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
    

    


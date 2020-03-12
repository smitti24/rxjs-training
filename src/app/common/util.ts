import {Observable} from "rxjs";


export function createHttpObservable(url: string): Observable<any> {
  return new Observable((observer) => {

    const controller = new AbortController();
    const signal = controller.signal;

    //Returns a promise.
    fetch(url, {signal})
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        // Used to emit values in the observable.
        observer.next(body);

        // Terminate http stream
        observer.complete();

        // Breaks observable contract!
        // observer.next();
      })
      .catch(error => {
        observer.error(error);
      });

    return () => controller.abort();
  });
}

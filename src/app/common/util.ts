import {Observable} from "rxjs";


export function createHttpObservable(url: string): Observable<any> {
  return new Observable((observer) => {
    //Returns a promise.
    fetch(url)
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
      })
  });
}

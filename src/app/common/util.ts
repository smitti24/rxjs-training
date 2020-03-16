import {Observable} from "rxjs";


export function createHttpObservable(url: string) {
  return new Observable((observer) => {

    const controller = new AbortController();
    const signal = controller.signal;

    //Returns a promise.
    fetch(url, {signal})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        else {
          observer.error('Request failed with status code: ' + response.status);
        }
      })
      .then((body) => {
        // Used to emit values in the observable.
        observer.next(body);

        // Terminate http stream
        observer.complete();

        // Breaks observable contract!
        // observer.next();
      })
      // Only triggered in the case of a fatal error.
      .catch(error => {
        observer.error(error);
      });

    return () => controller.abort();
  });
}

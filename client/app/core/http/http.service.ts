import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  public getData(api: string, options = {}): Observable<any> {
    return this.http.get(api)
      .pipe(
        catchError(this.handleError('get', []))
      );
  }

  public postData(api: string, data: any, options = {}): Observable<any> {
    return this.http.post(api, data)
      .pipe(
        catchError(this.handleError('post', []))
      );
  }

  public deleteData(api: string, options = {}): Observable<any> {
    return this.http.delete(api)
      .pipe(
        catchError(this.handleError('delete', []))
      );
  }

  public putData(api: string, data: any, options = {}): Observable<any> {
    return this.http.put(api, data)
      .pipe(
        catchError(this.handleError('put', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

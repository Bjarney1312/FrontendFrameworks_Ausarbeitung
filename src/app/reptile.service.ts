import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Reptile } from "./data/reptile";

@Injectable({
  providedIn: 'root'
})
export class ReptileService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private reptileUrl = 'api/reptiles';

  constructor(private http: HttpClient,) { }

  /** GET heroes from the server */
  getReptiles(): Observable<Reptile[]> {
    return this.http.get<Reptile[]>(this.reptileUrl)
      .pipe(
        catchError(this.handleError<Reptile[]>('getReptiles', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getReptile(id: string): Observable<Reptile> {
    const url = `${this.reptileUrl}/${id}`;
    return this.http.get<Reptile>(url).pipe(
      catchError(this.handleError<Reptile>(`getReptile id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateReptile(reptile: Reptile): Observable<any> {
    return this.http.put(this.reptileUrl, reptile, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateReptile'))
    );
  }

  /** POST: add a new hero to the server */
  addReptile(reptile: Reptile): Observable<Reptile> {
    console.log('TEST: Add Reptile wird ausgeführt' + reptile.name);
    return this.http.post<Reptile>(this.reptileUrl, reptile, this.httpOptions).pipe(
      catchError(this.handleError<Reptile>('addReptile'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteReptile(id: string): Observable<Reptile> {
    const url = `${this.reptileUrl}/${id}`;

    return this.http.delete<Reptile>(url, this.httpOptions).pipe(
      catchError(this.handleError<Reptile>('deleteReptile'))
    );
  }

  /* GET heroes whose name contains search term */
  searchReptiles(term: string): Observable<Reptile[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Reptile[]>(`${this.reptileUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Reptile[]>('searchReptiles', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

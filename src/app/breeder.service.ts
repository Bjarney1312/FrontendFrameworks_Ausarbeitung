import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Breeder } from "./data/breeder";

@Injectable({
  providedIn: 'root'
})
export class BreederService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private breederUrl = 'api/breeders';

  constructor(private http: HttpClient,) { }

  /** GET heroes from the server */
  getBreeders(): Observable<Breeder[]> {
    return this.http.get<Breeder[]>(this.breederUrl)
      .pipe(
        catchError(this.handleError<Breeder[]>('getBreeders', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getBreeder(id: string): Observable<Breeder> {
    const url = `${this.breederUrl}/${id}`;
    return this.http.get<Breeder>(url).pipe(
      catchError(this.handleError<Breeder>(`getBreeder id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateBreeder(breeder: Breeder): Observable<any> {
    return this.http.put(this.breederUrl, breeder, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateBreeder'))
    );
  }

  /** POST: add a new hero to the server */
  addBreeder(breeder: Breeder): Observable<Breeder> {
    console.log('TEST: Add Reptile wird ausgeführt' + breeder.firstName);
    return this.http.post<Breeder>(this.breederUrl, breeder, this.httpOptions).pipe(
      catchError(this.handleError<Breeder>('addBreeder'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteBreeder(id: string): Observable<Breeder> {
    const url = `${this.breederUrl}/${id}`;

    return this.http.delete<Breeder>(url, this.httpOptions).pipe(
      catchError(this.handleError<Breeder>('deleteBreeder'))
    );
  }

  /* GET heroes whose name contains search term */
  searchBreeder(term: string): Observable<Breeder[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Breeder[]>(`${this.breederUrl}/?lastName=${term}`).pipe(
      catchError(this.handleError<Breeder[]>('searchBreeders', []))
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

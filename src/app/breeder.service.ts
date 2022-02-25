import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Breeder} from "./data/breeder";

@Injectable({
  providedIn: 'root'
})
export class BreederService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private breederUrl = 'api/breeders';

  constructor(private http: HttpClient,) {
  }

  /** GET - Request: Holt alle Züchter vom Server */
  getBreeders(): Observable<Breeder[]> {
    return this.http.get<Breeder[]>(this.breederUrl)
      .pipe(
        catchError(this.handleError<Breeder[]>('getBreeders', []))
      );
  }

  /** GET - Request: Holt ein Züchter mit einer bestimmten ID vom Server */
  getBreeder(id: string): Observable<Breeder> {
    const url = `${this.breederUrl}/${id}`;
    return this.http.get<Breeder>(url).pipe(
      catchError(this.handleError<Breeder>(`getBreeder id=${id}`))
    );
  }

  /** PUT - Request: Aktualisiert einen Züchter */
  updateBreeder(breeder: Breeder): Observable<any> {
    return this.http.put(this.breederUrl, breeder, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateBreeder'))
    );
  }

  /** POST - Request: Fügt dem Server einen neuen Züchter hinzu */
  addBreeder(breeder: Breeder): Observable<Breeder> {
    console.log('TEST: Add Reptile wird ausgeführt' + breeder.firstName);
    return this.http.post<Breeder>(this.breederUrl, breeder, this.httpOptions).pipe(
      catchError(this.handleError<Breeder>('addBreeder'))
    );
  }

  /** DELETE - Request: Entfernt einen Züchter vom Server */
  deleteBreeder(id: string): Observable<Breeder> {
    const url = `${this.breederUrl}/${id}`;

    return this.http.delete<Breeder>(url, this.httpOptions).pipe(
      catchError(this.handleError<Breeder>('deleteBreeder'))
    );
  }

  /** GET - Request: Sucht nach einem Züchter mit einem bestimmten Nachnamen */
  searchBreeder(term: string): Observable<Breeder[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Breeder[]>(`${this.breederUrl}/?lastName=${term}`).pipe(
      catchError(this.handleError<Breeder[]>('searchBreeders', []))
    );
  }

  /**
   * Handler für fehlgeschlagene HTTP-Requests. Die Applikation wird fortgesetzt.
   *
   * @param operation - Name der Operation die fehlgeschlagen ist.
   * @param result - Optional als Ergebnis für das Observable
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

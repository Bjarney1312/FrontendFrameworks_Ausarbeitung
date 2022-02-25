import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Reptile} from "./data/reptile";

@Injectable({
  providedIn: 'root'
})
export class ReptileService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private reptileUrl = 'api/reptiles';

  constructor(private http: HttpClient,) {
  }

  /** GET - Request: Holt alle Tiere vom Server */
  getReptiles(): Observable<Reptile[]> {
    return this.http.get<Reptile[]>(this.reptileUrl)
      .pipe(
        catchError(this.handleError<Reptile[]>('getReptiles', []))
      );
  }

  /** GET - Request: Holt ein Tier mit einer bestimmten ID vom Server */
  getReptile(id: string): Observable<Reptile> {
    const url = `${this.reptileUrl}/${id}`;
    return this.http.get<Reptile>(url).pipe(
      catchError(this.handleError<Reptile>(`getReptile id=${id}`))
    );
  }

  /** PUT - Request: Aktualisiert ein Tier auf dem Server */
  updateReptile(reptile: Reptile): Observable<any> {
    return this.http.put(this.reptileUrl, reptile, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateReptile'))
    );
  }

  /** POST - Request: Fügt dem Server einen neues Tier hinzu */
  addReptile(reptile: Reptile): Observable<Reptile> {
    console.log('TEST: Add Reptile wird ausgeführt' + reptile.name);
    return this.http.post<Reptile>(this.reptileUrl, reptile, this.httpOptions).pipe(
      catchError(this.handleError<Reptile>('addReptile'))
    );
  }

  /** DELETE - Request: Entfernt ein Tier vom Server */
  deleteReptile(id: string): Observable<Reptile> {
    const url = `${this.reptileUrl}/${id}`;

    return this.http.delete<Reptile>(url, this.httpOptions).pipe(
      catchError(this.handleError<Reptile>('deleteReptile'))
    );
  }

  /** GET - Request: Sucht nach einem Züchter mit einem bestimmten Nachnamen */
  searchReptiles(term: string): Observable<Reptile[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Reptile[]>(`${this.reptileUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Reptile[]>('searchReptiles', []))
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

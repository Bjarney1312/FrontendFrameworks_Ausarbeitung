import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Feeding} from "./data/feeding";

@Injectable({
  providedIn: 'root'
})
export class FeedingService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private feedingUrl = 'api/feedings';  // URL to web api

  constructor(private http: HttpClient,) { }

  /** GET heroes from the server */
  getFeedings(): Observable<Feeding[]> {
    return this.http.get<Feeding[]>(this.feedingUrl)
      .pipe(
        // tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Feeding[]>('getFeedings', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getFeeding(id: number): Observable<Feeding> {
    const url = `${this.feedingUrl}/${id}`;
    return this.http.get<Feeding>(url).pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Feeding>(`getFeeding id=${id}`))
    );
  }

  getFeedingsByReptile(reptileid: number): Observable<Feeding[]> {
    const url = `${this.feedingUrl}`;

    let params = new HttpParams();
    params = params.append('reptileid', 1);

    return this.http.get<Feeding[]>(url, {params: params } )
      .pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Feeding[]>(`getFeedingsByReptile id=${reptileid}`))
    );
  }

  /** PUT: update the hero on the server */
  updateFeeding(feeding: Feeding): Observable<any> {
    return this.http.put(this.feedingUrl, feeding, this.httpOptions).pipe(
      // tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateFeeding'))
    );
  }

  /** POST: add a new hero to the server */
  addFeeding(feeding: Feeding): Observable<Feeding> {
    console.log('TEST: Add Feeding wird ausgeführt' + feeding.type);
    return this.http.post<Feeding>(this.feedingUrl, feeding, this.httpOptions).pipe(
      // tap((newHero: Reptile) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Feeding>('addFeeding'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteFeeding(id: number): Observable<Feeding> {
    const url = `${this.feedingUrl}/${id}`;

    return this.http.delete<Feeding>(url, this.httpOptions).pipe(
      // tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Feeding>('deleteFeeding'))
    );
  }

  /* GET heroes whose name contains search term */
  searchReptiles(term: string): Observable<Feeding[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Feeding[]>(`${this.feedingUrl}/?name=${term}`).pipe(
      // tap(x => x.length ?
      //   this.log(`found heroes matching "${term}"`) :
      //   this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Feeding[]>('searchHeroes', []))
    );
  }

  // /** Log a HeroService message with the MessageService */
  // private log(message: string) {
  //   this.messageService.add(`HeroService: ${message}`);
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

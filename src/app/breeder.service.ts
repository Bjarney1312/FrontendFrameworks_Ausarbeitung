import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Reptile} from "./data/reptile";
import {Breeder} from "./data/breeder";

@Injectable({
  providedIn: 'root'
})
export class BreederService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private breederUrl = 'api/breeders';  // URL to web api

  constructor(private http: HttpClient,) { }

  /** GET heroes from the server */
  getBreeders(): Observable<Breeder[]> {
    return this.http.get<Breeder[]>(this.breederUrl)
      .pipe(
        // tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Breeder[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getBreeder(id: string): Observable<Breeder> {
    const url = `${this.breederUrl}/${id}`;
    return this.http.get<Breeder>(url).pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Breeder>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateBreeder(breeder: Breeder): Observable<any> {
    return this.http.put(this.breederUrl, breeder, this.httpOptions).pipe(
      // tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addBreeder(breeder: Breeder): Observable<Breeder> {
    console.log('TEST: Add Reptile wird ausgeführt' + breeder.firstName);
    return this.http.post<Breeder>(this.breederUrl, breeder, this.httpOptions).pipe(
      // tap((newHero: Reptile) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Breeder>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteBreeder(id: string): Observable<Breeder> {
    const url = `${this.breederUrl}/${id}`;

    return this.http.delete<Breeder>(url, this.httpOptions).pipe(
      // tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Breeder>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchBreeder(term: string): Observable<Breeder[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Breeder[]>(`${this.breederUrl}/?lastname=${term}`).pipe(
      // tap(x => x.length ?
      //   this.log(`found heroes matching "${term}"`) :
      //   this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Breeder[]>('searchHeroes', []))
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

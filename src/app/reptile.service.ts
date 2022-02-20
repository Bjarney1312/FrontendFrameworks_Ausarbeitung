import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Reptile} from "./data/reptile";
import {Breeder} from "./data/breeder";

@Injectable({
  providedIn: 'root'
})
export class ReptileService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private reptileUrl = 'api/reptiles';  // URL to web api

  constructor(private http: HttpClient,) { }

  /** GET heroes from the server */
  getReptiles(): Observable<Reptile[]> {
    return this.http.get<Reptile[]>(this.reptileUrl)
      .pipe(
        // tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Reptile[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getReptile(id: string): Observable<Reptile> {
    const url = `${this.reptileUrl}/${id}`;
    return this.http.get<Reptile>(url).pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Reptile>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateReptile(reptile: Reptile): Observable<any> {
    return this.http.put(this.reptileUrl, reptile, this.httpOptions).pipe(
      // tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addReptile(reptile: Reptile): Observable<Reptile> {
    console.log('TEST: Add Reptile wird ausgeführt' + reptile.name);
    return this.http.post<Reptile>(this.reptileUrl, reptile, this.httpOptions).pipe(
      // tap((newHero: Reptile) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Reptile>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteReptile(id: string): Observable<Reptile> {
    const url = `${this.reptileUrl}/${id}`;

    return this.http.delete<Reptile>(url, this.httpOptions).pipe(
      // tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Reptile>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchReptiles(term: string): Observable<Reptile[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Reptile[]>(`${this.reptileUrl}/?name=${term}`).pipe(
      // tap(x => x.length ?
      //   this.log(`found heroes matching "${term}"`) :
      //   this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Reptile[]>('searchHeroes', []))
    );
  }

  getReptilesByBreeder(breeder: string): Observable<Reptile[]> {
    const url = `${this.reptileUrl}/?breeder/${breeder}`;

    // let params = new HttpParams();
    // params = params.append('breeder', breeder);
    let params = new HttpParams().set('breeder', breeder);

    return this.http.get<Reptile[]>(url, {params: params } )
      .pipe(
        // tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Reptile[]>(`get breeder by id=${breeder}`))
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

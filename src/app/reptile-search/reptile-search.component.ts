import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Reptile } from '../data/reptile';
import { ReptileService } from '../reptile.service';

@Component({
  selector: 'app-reptile-search',
  templateUrl: './reptile-search.component.html',
  styleUrls: [ './reptile-search.component.css' ]
})
export class ReptileSearchComponent implements OnInit {
  reptiles$!: Observable<Reptile[]>;
  private searchTerms = new Subject<string>();

  constructor(private reptileService: ReptileService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.reptiles$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.reptileService.searchReptiles(term)),
    );
  }
}

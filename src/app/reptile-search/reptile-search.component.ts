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

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.reptiles$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.reptileService.searchReptiles(term)),
    );
  }
}

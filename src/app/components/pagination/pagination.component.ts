import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  totalSelector,
  pageSelector,
} from 'src/app/state/artworks/artwork.selectors';
import { nextPage, prevPage } from 'src/app/state/artworks/artwork.actions';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  readonly perPage = 8;
  count$: Observable<number>;
  page$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.count$ = this.store.pipe(select(totalSelector));
    this.page$ = this.store.pipe(select(pageSelector));
  }

  goPrevPage() {
    this.store.dispatch(prevPage());
  }

  goNextPage() {
    this.store.dispatch(nextPage());
  }

  goToPage(n: number) {
    // this.page = n;
  }
}

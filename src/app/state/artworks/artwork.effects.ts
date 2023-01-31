import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  from,
  mergeMap,
  of,
  switchMap,
  map,
  withLatestFrom,
} from 'rxjs';
import { ArtworkService } from 'src/app/services/artwork.service';
import {
  loadArtworks,
  loadArtworksSuccess,
  loadArtworksFailure,
  nextPage,
  prevPage,
  goToPage,
} from './artwork.actions';
import { pageSelector } from './artwork.selectors';
import { AppState } from '../app.state';

@Injectable()
export class ArtworksEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private artworksService: ArtworkService
  ) {}

  loadArtworks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadArtworks),
      withLatestFrom(this.store$.select(pageSelector)),
      switchMap(([actions, page]) =>
        from(this.artworksService.getArtworks(page)).pipe(
          map((response) =>
            loadArtworksSuccess({
              artworks: response.data,
              total: response.pagination.total,
              baseUrl: response.config.iiif_url,
            })
          ),
          catchError(() => of(loadArtworksFailure({ error: 'error' })))
        )
      )
    )
  );

  pageChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nextPage, prevPage, goToPage),
      switchMap(() => [loadArtworks()])
    )
  );
}

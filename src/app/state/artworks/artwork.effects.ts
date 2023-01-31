import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, mergeMap, of, switchMap, map } from 'rxjs';
import { ArtworkService } from 'src/app/services/artwork.service';
import {
  loadArtworks,
  loadArtworksSuccess,
  loadArtworksFailure,
} from './artwork.actions';
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
      switchMap(() =>
        from(this.artworksService.getArtworks()).pipe(
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
}

import { createAction, props } from '@ngrx/store';
import { Artwork } from 'src/app/models';

export const loadArtworks = createAction('[Artworks API] Load Artworks');

export const loadArtworksSuccess = createAction(
  '[Artworks API] Artworks Load Success',
  props<{ artworks: Artwork[]; total: number; baseUrl: string }>()
);

export const loadArtworksFailure = createAction(
  '[Artworks API] Artworks Load Failure',
  props<{ error: string }>()
);

export const nextPage = createAction('[Pagination] Next Page');

export const prevPage = createAction('[Pagination] Prev Page');

export const goToPage = createAction(
  '[Pagination] Go To Page',
  props<{ page: number }>()
);
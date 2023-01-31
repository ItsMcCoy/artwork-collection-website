import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ArtworkState } from './artwork.reducer';

export const selectArtworks = (state: AppState) => state.artworks;

export const isLoadingSelector = createSelector(
  selectArtworks,
  (state) => state.isLoading
);

export const artworksSelector = createSelector(
  selectArtworks,
  (state) => state.artworks
);

export const pageSelector = createSelector(
  selectArtworks,
  (state) => state.page
);

export const totalSelector = createSelector(
  selectArtworks,
  (state) => state.total
);

export const baseImageUrlSelector = createSelector(
  selectArtworks,
  (state) => state.baseImageUrl
);

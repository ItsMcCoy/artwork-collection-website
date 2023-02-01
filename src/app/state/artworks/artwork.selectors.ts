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

export const filtersSelector = createSelector(
  selectArtworks,
  (state) => state.filters
);

export const filterOptionsSelector = createSelector(
  artworksSelector,
  (artworks) => {
    const styleObj = artworks.reduce((acc, value) => {
      value.style_titles.forEach((style: string) => {
        if (!acc[style]) {
          acc[style] = 1;
        } else {
          acc[style]++;
        }
      });
      return acc;
    }, {} as any);
    return Object.keys(styleObj).map((key) => ({
      style: key,
      count: styleObj[key],
    }));
  }
);

export const filteredArtworksSelector = createSelector(
  artworksSelector,
  filtersSelector,
  (artworks, filters) => {
    if (filters.length === 0) {
      return artworks;
    }
    return artworks.filter((artwork) => {
      return artwork.style_titles.some((style) => filters.includes(style));
    });
  }
);

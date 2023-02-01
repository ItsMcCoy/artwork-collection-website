import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { SortOption } from 'src/app/models';

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

export const sortBySelector = createSelector(
  selectArtworks,
  (state) => state.sortBy
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

export const sortedArtworksSelector = createSelector(
  filteredArtworksSelector,
  sortBySelector,
  (artworks, sortBy) => {
    if (!sortBy) {
      return artworks;
    }
    switch (sortBy) {
      case SortOption.Artist:
        return [...artworks].sort((a, b) => {
          if (a.artist_title === null) {
            return 1;
          }
          if (b.artist_title === null) {
            return -1;
          }
          if (a.artist_title === b.artist_title) {
            return 0;
          }
          return a.artist_title < b.artist_title ? -1 : 1;
        });
      case SortOption.Name:
        return [...artworks].sort((a, b) => {
          if (a.title === null) {
            return 1;
          }
          if (b.title === null) {
            return -1;
          }
          if (a.title === b.title) {
            return 0;
          }
          return a.title < b.title ? -1 : 1;
        });
      case SortOption.Date:
        return [...artworks].sort((a, b) => {
          if (a.date_start === null) {
            return 1;
          }
          if (b.date_start === null) {
            return -1;
          }
          if (a.date_start === b.date_start) {
            return 0;
          }
          return a.date_start < b.date_start ? -1 : 1;
        });
      default:
        return artworks;
    }
  }
);

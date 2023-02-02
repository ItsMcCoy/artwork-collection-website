import { createReducer, on } from '@ngrx/store';
import { Artwork, SortBy } from 'src/app/models';
import {
  loadArtworks,
  loadArtworksSuccess,
  loadArtworksFailure,
  nextPage,
  prevPage,
  goToPage,
  setFilters,
  setSortBy,
} from './artwork.actions';

export interface ArtworkState {
  isLoading: boolean;
  error: string | null;
  artworks: Artwork[];
  page: number;
  total: number;
  filters: string[];
  sortBy: SortBy;
  baseImageUrl: string;
}

export const initialState: ArtworkState = {
  isLoading: false,
  error: null,
  artworks: [],
  page: 1,
  total: 0,
  filters: [],
  sortBy: null,
  baseImageUrl: '',
};

export const artworkReducer = createReducer(
  initialState,
  on(loadArtworks, (state) => ({
    ...state,
    isLoading: true,
    artworks: [],
    filters: [],
  })),
  on(loadArtworksSuccess, (state, { artworks, total, baseUrl }) => ({
    ...state,
    artworks: artworks,
    error: null,
    isLoading: false,
    total: total,
    baseImageUrl: baseUrl,
  })),
  on(loadArtworksFailure, (state, { error }) => ({
    ...state,
    artworks: [],
    error: error,
    isLoading: false,
  })),
  on(nextPage, (state) => ({ ...state, page: state.page + 1 })),
  on(prevPage, (state) => ({
    ...state,
    page: state.page > 1 ? state.page - 1 : 1,
  })),
  on(goToPage, (state, { page }) => ({ ...state, page: page })),
  on(setFilters, (state, { filters }) => ({ ...state, filters: filters })),
  on(setSortBy, (state, { option }) => ({ ...state, sortBy: option }))
);

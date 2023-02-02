import * as artworkReducer from './artwork.reducer';
import * as artworkActions from './artwork.actions';
import { SortField } from 'src/app/models';

describe('ArtworkReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = artworkReducer;
      const action = {
        type: 'unknown',
      };
      const state = artworkReducer.artworkReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });

  describe('loadArtworks action', () => {
    it('should update the state collectly in an immutable way', () => {
      const { initialState } = artworkReducer;
      const newState: artworkReducer.ArtworkState = {
        ...initialState,
        isLoading: true,
        artworks: [],
        filters: [],
      };

      const action = artworkActions.loadArtworks();
      const state = artworkReducer.artworkReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState); // new state be immutable (new reference)
    });
  });

  describe('loadArtworksSuccess action', () => {
    it('should update the state collectly in an immutable way', () => {
      const { initialState } = artworkReducer;
      const mock = {
        artworks: [
          {
            id: 1,
            title: 'test',
            image_id: '1',
            alt_titles: null,
            artist_title: null,
            place_of_origin: 'France',
            date_start: null,
            date_end: null,
            style_titles: [],
            medium_display: '',
          },
        ],
        total: 1,
        baseUrl: 'http://localhost',
      };
      const newState: artworkReducer.ArtworkState = {
        ...initialState,
        isLoading: false,
        error: null,
        artworks: [...mock.artworks],
        total: mock.total,
        baseImageUrl: mock.baseUrl,
      };

      const action = artworkActions.loadArtworksSuccess({
        artworks: mock.artworks,
        total: mock.total,
        baseUrl: mock.baseUrl,
      });
      const state = artworkReducer.artworkReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('loadArtworksFailure action', () => {
    it('should update error state collectly', () => {
      const { initialState } = artworkReducer;
      const action = artworkActions.loadArtworksFailure({ error: 'error' });
      const state = artworkReducer.artworkReducer(initialState, action);
      expect(state.error).toEqual('error');
    });
  });

  describe('nextPage action', () => {
    it('should update page state collectly', () => {
      const { initialState } = artworkReducer;
      const action = artworkActions.nextPage();
      const state = artworkReducer.artworkReducer(initialState, action);
      expect(state.page).toEqual(2);
    });
  });

  describe('prevPage action', () => {
    it('should update page state collectly (not below than 1)', () => {
      const initialState = {
        ...artworkReducer.initialState,
        page: 2,
      };
      const action = artworkActions.prevPage();
      const state = artworkReducer.artworkReducer(initialState, action);
      expect(state.page).toEqual(1);

      const newState = artworkReducer.artworkReducer(state, action);
      expect(newState.page).toEqual(1);
    });
  });

  describe('setFilters action', () => {
    it('should update page state collectly', () => {
      const { initialState } = artworkReducer;
      const action = artworkActions.setFilters({ filters: ['a'] });
      const state = artworkReducer.artworkReducer(initialState, action);
      expect(state.filters).toEqual(['a']);
    });
  });

  describe('setSortBy action', () => {
    it('should update page state collectly', () => {
      const { initialState } = artworkReducer;
      const action = artworkActions.setSortBy({ option: SortField.Artist });
      const state = artworkReducer.artworkReducer(initialState, action);
      expect(state.sortBy).toEqual(SortField.Artist);
    });
  });
});

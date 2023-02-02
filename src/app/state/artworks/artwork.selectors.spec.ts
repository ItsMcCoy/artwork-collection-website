import * as fromArtworkSelector from './artwork.selectors';
import * as artworkReducer from './artwork.reducer';
import { SortField } from 'src/app/models';

describe('ArtworkSelector', () => {
  const mockArtworks = [
    {
      id: 1,
      title: 'A picture of river',
      image_id: '1',
      alt_titles: null,
      artist_title: 'David',
      place_of_origin: 'France',
      date_start: 1975,
      date_end: null,
      style_titles: ['Impressionism'],
      medium_display: '',
    },
    {
      id: 2,
      title: 'Something happened',
      image_id: '2',
      alt_titles: null,
      artist_title: 'Adam',
      place_of_origin: 'France',
      date_start: 1940,
      date_end: null,
      style_titles: ['Impressionism', 'Modern'],
      medium_display: '',
    },
  ];

  describe('isLoadingSelector', () => {
    it('should select isLoading state correctly', () => {
      const initialState: artworkReducer.ArtworkState = {
        ...artworkReducer.initialState,
        isLoading: true,
      };

      const result =
        fromArtworkSelector.isLoadingSelector.projector(initialState);
      expect(result).toEqual(true);
    });
  });

  describe('artworksSelector', () => {
    it('should select artworks state correctly', () => {
      const initialState: artworkReducer.ArtworkState = {
        ...artworkReducer.initialState,
        artworks: mockArtworks,
      };

      const result =
        fromArtworkSelector.artworksSelector.projector(initialState);
      expect(result).toEqual(mockArtworks);
    });
  });

  describe('pageSelector', () => {
    it('should select page state correctly', () => {
      const initialState: artworkReducer.ArtworkState = {
        ...artworkReducer.initialState,
        page: 10,
      };

      const result = fromArtworkSelector.pageSelector.projector(initialState);
      expect(result).toEqual(10);
    });
  });

  describe('totalSelector', () => {
    it('should select total state correctly', () => {
      const initialState: artworkReducer.ArtworkState = {
        ...artworkReducer.initialState,
        total: 100,
      };

      const result = fromArtworkSelector.totalSelector.projector(initialState);
      expect(result).toEqual(100);
    });
  });

  describe('baseImageUrlSelector', () => {
    it('should select baseImageUrl state correctly', () => {
      const initialState: artworkReducer.ArtworkState = {
        ...artworkReducer.initialState,
        baseImageUrl: 'test',
      };

      const result =
        fromArtworkSelector.baseImageUrlSelector.projector(initialState);
      expect(result).toEqual('test');
    });
  });

  describe('filtersSelector', () => {
    it('should select filters state correctly', () => {
      const initialState: artworkReducer.ArtworkState = {
        ...artworkReducer.initialState,
        filters: ['test'],
      };

      const result =
        fromArtworkSelector.filtersSelector.projector(initialState);
      expect(result).toEqual(['test']);
    });
  });

  describe('sortBySelector', () => {
    it('should select sortBy state correctly', () => {
      const initialState: artworkReducer.ArtworkState = {
        ...artworkReducer.initialState,
        sortBy: SortField.Name,
      };

      const result = fromArtworkSelector.sortBySelector.projector(initialState);
      expect(result).toEqual(SortField.Name);
    });
  });

  describe('filterOptionsSelector', () => {
    it('should select FilterOption based on current artworks state', () => {
      const initialState: artworkReducer.ArtworkState = {
        ...artworkReducer.initialState,
        artworks: mockArtworks,
      };
      const artworksState =
        fromArtworkSelector.artworksSelector.projector(initialState);
      const result =
        fromArtworkSelector.filterOptionsSelector.projector(artworksState);
      expect(result).toEqual([
        { style: 'Impressionism', count: 2 },
        { style: 'Modern', count: 1 },
      ]);
    });
  });

  describe('filteredArtworksSelector', () => {
    it('should select all current artworks state if filters is empty', () => {
      const initialState: artworkReducer.ArtworkState = {
        ...artworkReducer.initialState,
        artworks: mockArtworks,
      };
      const artworksState =
        fromArtworkSelector.artworksSelector.projector(initialState);
      const filtersState =
        fromArtworkSelector.filtersSelector.projector(initialState);
      const result = fromArtworkSelector.filteredArtworksSelector.projector(
        artworksState,
        filtersState
      );
      expect(result).toEqual(mockArtworks);
    });

    it('should select matched artworks state by current filters state', () => {
      const initialState: artworkReducer.ArtworkState = {
        ...artworkReducer.initialState,
        artworks: mockArtworks,
        filters: ['Modern'],
      };
      const artworksState =
        fromArtworkSelector.artworksSelector.projector(initialState);
      const filtersState =
        fromArtworkSelector.filtersSelector.projector(initialState);
      const result = fromArtworkSelector.filteredArtworksSelector.projector(
        artworksState,
        filtersState
      );
      expect(result).toEqual([mockArtworks[1]]);
    });
  });

  describe('sortedArtworksSelector', () => {
    it('should select artworks with current order if sortBy state is not selected', () => {
      const initialState: artworkReducer.ArtworkState = {
        ...artworkReducer.initialState,
        artworks: mockArtworks,
      };
      const artworksState =
        fromArtworkSelector.artworksSelector.projector(initialState);
      const filtersState =
        fromArtworkSelector.filtersSelector.projector(initialState);
      const filteredArtworks =
        fromArtworkSelector.filteredArtworksSelector.projector(
          artworksState,
          filtersState
        );
      const sortByState =
        fromArtworkSelector.sortBySelector.projector(initialState);
      const result = fromArtworkSelector.sortedArtworksSelector.projector(
        filteredArtworks,
        sortByState
      );
      expect(result).toEqual(mockArtworks);
    });

    it('should select artworks sorted by artist name correctly', () => {
      const initialState: artworkReducer.ArtworkState = {
        ...artworkReducer.initialState,
        artworks: mockArtworks,
        sortBy: SortField.Artist,
      };
      const artworksState =
        fromArtworkSelector.artworksSelector.projector(initialState);
      const filtersState =
        fromArtworkSelector.filtersSelector.projector(initialState);
      const filteredArtworks =
        fromArtworkSelector.filteredArtworksSelector.projector(
          artworksState,
          filtersState
        );
      const sortByState =
        fromArtworkSelector.sortBySelector.projector(initialState);
      const result = fromArtworkSelector.sortedArtworksSelector.projector(
        filteredArtworks,
        sortByState
      );
      expect(result).toEqual([mockArtworks[1], mockArtworks[0]]);
    });
  });

  it('should select artworks sorted by artwork name correctly', () => {
    const initialState: artworkReducer.ArtworkState = {
      ...artworkReducer.initialState,
      artworks: mockArtworks,
      sortBy: SortField.Name,
    };
    const artworksState =
      fromArtworkSelector.artworksSelector.projector(initialState);
    const filtersState =
      fromArtworkSelector.filtersSelector.projector(initialState);
    const filteredArtworks =
      fromArtworkSelector.filteredArtworksSelector.projector(
        artworksState,
        filtersState
      );
    const sortByState =
      fromArtworkSelector.sortBySelector.projector(initialState);
    const result = fromArtworkSelector.sortedArtworksSelector.projector(
      filteredArtworks,
      sortByState
    );
    expect(result).toEqual([mockArtworks[0], mockArtworks[1]]);
  });

  it('should select artworks sorted by creation start year correctly', () => {
    const initialState: artworkReducer.ArtworkState = {
      ...artworkReducer.initialState,
      artworks: mockArtworks,
      sortBy: SortField.Date,
    };
    const artworksState =
      fromArtworkSelector.artworksSelector.projector(initialState);
    const filtersState =
      fromArtworkSelector.filtersSelector.projector(initialState);
    const filteredArtworks =
      fromArtworkSelector.filteredArtworksSelector.projector(
        artworksState,
        filtersState
      );
    const sortByState =
      fromArtworkSelector.sortBySelector.projector(initialState);
    const result = fromArtworkSelector.sortedArtworksSelector.projector(
      filteredArtworks,
      sortByState
    );
    expect(result).toEqual([mockArtworks[1], mockArtworks[0]]);
  });
});

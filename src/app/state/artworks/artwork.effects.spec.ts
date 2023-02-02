import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ArtworksEffects } from './artwork.effects';
import * as artworkReducer from './artwork.reducer';
import { ArtworkService } from 'src/app/services/artwork.service';
import { TestScheduler } from 'rxjs/testing';
import {
  goToPage,
  loadArtworks,
  loadArtworksSuccess,
  nextPage,
  prevPage,
} from './artwork.actions';

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

const mockResponse = {
  data: mockArtworks,
  pagination: {
    total: 2,
  },
  config: {
    iiif_url: 'http://localhost',
  },
};

describe('ArtworskEffects', () => {
  const initialState = {
    ...artworkReducer.initialState,
  };
  const artworksService = jasmine.createSpyObj('artworksService', [
    'getArtworks',
  ]);

  let effects: ArtworksEffects;
  let actions: Observable<any>;
  let store: MockStore;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArtworksEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: ArtworkService, useValue: artworksService },
      ],
    });

    effects = TestBed.inject(ArtworksEffects);
    store = TestBed.inject(MockStore);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadArtworks$', () => {
    it('should handle loadArtworks and return loadArtworksSuccess action', () => {
      const action = loadArtworks();
      const outcome = loadArtworksSuccess({
        artworks: mockArtworks,
        total: 2,
        baseUrl: 'http://localhost',
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', {
          b: mockResponse,
        });
        artworksService.getArtworks.and.returnValue(response);

        expectObservable(effects.loadArtworks$).toBe('--b', { b: outcome });
      });
    });
  });

  describe('pageChange$', () => {
    it('should handle nextPage and return loadArtworks action', () => {
      const action = nextPage();
      const outcome = loadArtworks();

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        expectObservable(effects.pageChange$).toBe('-b', { b: outcome });
      });
    });

    it('should handle prevPage and return loadArtworks action', () => {
      const action = prevPage();
      const outcome = loadArtworks();

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        expectObservable(effects.pageChange$).toBe('-b', { b: outcome });
      });
    });

    it('should handle goToPage and return loadArtworks action', () => {
      const action = goToPage({ page: 2 });
      const outcome = loadArtworks();

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });

        expectObservable(effects.pageChange$).toBe('-b', { b: outcome });
      });
    });
  });
});

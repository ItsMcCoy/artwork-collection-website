import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ArtworksComponent } from './artworks.component';
import { ArtworkItemComponent } from '../artwork-item/artwork-item.component';
import { AppState } from 'src/app/state/app.state';
import * as ArtworkReducer from 'src/app/state/artworks/artwork.reducer';

describe('ArtworksComponent', () => {
  let component: ArtworksComponent;
  let fixture: ComponentFixture<ArtworksComponent>;
  let store: MockStore<AppState>;
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

  const initialState: AppState = {
    artworks: {
      ...ArtworkReducer.initialState,
      artworks: mockArtworks,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      declarations: [ArtworksComponent, ArtworkItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ArtworksComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should render all artworks', () => {
    expect(fixture.debugElement.queryAll(By.css('.card-wrapper')).length).toBe(
      2
    );
  });

  it('should update the UI when the store changes', () => {
    store.setState({
      artworks: { ...ArtworkReducer.initialState, artworks: [mockArtworks[0]] },
    });
    store.refreshState();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.card-wrapper')).length).toBe(
      1
    );
  });
});

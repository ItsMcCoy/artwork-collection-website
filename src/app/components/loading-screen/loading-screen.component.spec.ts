import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LoadingScreenComponent } from './loading-screen.component';
import { AppState } from 'src/app/state/app.state';
import * as ArtworkReducer from 'src/app/state/artworks/artwork.reducer';

describe('LoadingScreenComponent', () => {
  let component: LoadingScreenComponent;
  let fixture: ComponentFixture<LoadingScreenComponent>;
  let store: MockStore<AppState>;

  const initialState: AppState = {
    artworks: {
      ...ArtworkReducer.initialState,
      isLoading: false,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      declarations: [LoadingScreenComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LoadingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render component when isLoading state in the store is false', () => {
    expect(
      fixture.debugElement.queryAll(By.css('.screen-overlay')).length
    ).toBe(0);
  });

  it('should render component when isLoading state is the store change to true', () => {
    store.setState({
      artworks: { ...ArtworkReducer.initialState, isLoading: true },
    });
    store.refreshState();
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.screen-overlay')).length
    ).toBe(1);
  });
});

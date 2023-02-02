import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ActionPanelComponent } from './components/action-panel/action-panel.component';
import { ArtworksComponent } from './components/artworks/artworks.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { AppState } from 'src/app/state/app.state';
import * as ArtworkReducer from 'src/app/state/artworks/artwork.reducer';

describe('AppComponent', () => {
  let store: MockStore<AppState>;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  const initialState: AppState = {
    artworks: {
      ...ArtworkReducer.initialState,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      declarations: [
        AppComponent,
        HeaderComponent,
        ActionPanelComponent,
        ArtworksComponent,
        PaginationComponent,
        LoadingScreenComponent,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientJsonpModule,
        HttpClientModule,
        ReactiveFormsModule,
        NxDropdownModule,
        NxFormfieldModule,
        NxGridModule,
        NxHeadlineModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});

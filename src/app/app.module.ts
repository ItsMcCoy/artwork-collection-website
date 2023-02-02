import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxCardModule } from '@aposin/ng-aquila/card';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';

import { AppComponent } from './app.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HeaderComponent } from './components/header/header.component';
import { StyleFilterComponent } from './components/style-filter/style-filter.component';
import { ArtworksComponent } from './components/artworks/artworks.component';
import { ArtworkItemComponent } from './components/artwork-item/artwork-item.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { artworkReducer } from './state/artworks/artwork.reducer';
import { ArtworksEffects } from './state/artworks/artwork.effects';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { ActionPanelComponent } from './components/action-panel/action-panel.component';
import { SortFieldComponent } from './components/sort-field/sort-field.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    HeaderComponent,
    StyleFilterComponent,
    ArtworksComponent,
    ArtworkItemComponent,
    LoadingScreenComponent,
    ActionPanelComponent,
    SortFieldComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    NxDropdownModule,
    NxFormfieldModule,
    NxGridModule,
    NxHeadlineModule,
    NxPaginationModule,
    NxCardModule,
    NxSpinnerModule,
    StoreModule.forRoot({ artworks: artworkReducer }),
    EffectsModule.forRoot([ArtworksEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

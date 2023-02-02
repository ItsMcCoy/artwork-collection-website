import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ActionPanelComponent } from './action-panel.component';
import { StyleFilterComponent } from '../style-filter/style-filter.component';
import { SortFieldComponent } from '../sort-field/sort-field.component';
import { AppState } from 'src/app/state/app.state';
import * as ArtworkReducer from 'src/app/state/artworks/artwork.reducer';

describe('ActionPanelComponent', () => {
  let component: ActionPanelComponent;
  let fixture: ComponentFixture<ActionPanelComponent>;
  let store: MockStore<AppState>;

  const initialState: AppState = {
    artworks: {
      ...ArtworkReducer.initialState,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      declarations: [
        ActionPanelComponent,
        SortFieldComponent,
        StyleFilterComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ActionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

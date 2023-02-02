import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';

import { StyleFilterComponent } from './style-filter.component';
import { AppState } from 'src/app/state/app.state';
import * as ArtworkReducer from 'src/app/state/artworks/artwork.reducer';

describe('StyleFilterComponent', () => {
  let component: StyleFilterComponent;
  let fixture: ComponentFixture<StyleFilterComponent>;
  let store: MockStore<AppState>;

  const initialState: AppState = {
    artworks: {
      ...ArtworkReducer.initialState,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      imports: [NxFormfieldModule, NxDropdownModule],
      declarations: [StyleFilterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(StyleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

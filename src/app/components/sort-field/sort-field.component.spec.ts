import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppState } from 'src/app/state/app.state';
import * as ArtworkReducer from 'src/app/state/artworks/artwork.reducer';
import { SortFieldComponent } from './sort-field.component';

describe('SortFieldComponent', () => {
  let component: SortFieldComponent;
  let fixture: ComponentFixture<SortFieldComponent>;
  let store: MockStore<AppState>;

  const initialState: AppState = {
    artworks: {
      ...ArtworkReducer.initialState,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      imports: [NxDropdownModule, NxFormfieldModule],
      declarations: [SortFieldComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SortFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

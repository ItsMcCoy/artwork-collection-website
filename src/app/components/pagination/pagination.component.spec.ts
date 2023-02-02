import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PaginationComponent } from './pagination.component';
import { AppState } from 'src/app/state/app.state';
import * as ArtworkReducer from 'src/app/state/artworks/artwork.reducer';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let store: MockStore<AppState>;

  const initialState: AppState = {
    artworks: {
      ...ArtworkReducer.initialState,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      imports: [NxPaginationModule],
      declarations: [PaginationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

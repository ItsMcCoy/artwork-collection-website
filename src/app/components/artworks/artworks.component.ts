import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Artwork } from 'src/app/models';
import { AppState } from 'src/app/state/app.state';
import {
  artworksSelector,
  baseImageUrlSelector,
} from 'src/app/state/artworks/artwork.selectors';
import { loadArtworks } from 'src/app/state/artworks/artwork.actions';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss'],
})
export class ArtworksComponent implements OnInit {
  artworks$: Observable<Artwork[]>;
  baseImageUrl$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.artworks$ = this.store.pipe(select(artworksSelector));
    this.baseImageUrl$ = this.store.pipe(select(baseImageUrlSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(loadArtworks());
  }
}

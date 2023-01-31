import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { isLoadingSelector } from 'src/app/state/artworks/artwork.selectors';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent {
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }
}

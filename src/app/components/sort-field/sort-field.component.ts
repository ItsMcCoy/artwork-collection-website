import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { NxDropdownSelectChange } from '@aposin/ng-aquila/dropdown';
import { sortByOptions, SortField, SortBy } from 'src/app/models';
import { sortBySelector } from 'src/app/state/artworks/artwork.selectors';
import { setSortBy } from 'src/app/state/artworks/artwork.actions';

@Component({
  selector: 'app-sort-field',
  templateUrl: './sort-field.component.html',
  styleUrls: ['./sort-field.component.scss'],
})
export class SortFieldComponent {
  options: SortField[] = sortByOptions;
  model: SortBy = null;

  constructor(private store: Store<AppState>) {
    this.store
      .pipe(select(sortBySelector))
      .subscribe((value) => (this.model = value));
  }

  handleChange(event: NxDropdownSelectChange) {
    this.store.dispatch(setSortBy({ option: event.value }));
  }
}

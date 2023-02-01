import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FilterOption } from 'src/app/models';
import { AppState } from 'src/app/state/app.state';
import {
  filtersSelector,
  filterOptionsSelector,
} from 'src/app/state/artworks/artwork.selectors';
import { setFilters } from 'src/app/state/artworks/artwork.actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  filters$: Observable<FilterOption[]>;
  model: string[] = [];

  constructor(private store: Store<AppState>) {
    this.filters$ = this.store.pipe(select(filterOptionsSelector));
    this.store
      .pipe(select(filtersSelector))
      .subscribe((value) => (this.model = value));
  }

  selectLabel(option: FilterOption): string {
    return `${option.style} (${option.count})`;
  }

  selectValue(option: FilterOption): string {
    return option.style;
  }

  handleChange(value: string[]) {
    this.store.dispatch(setFilters({ filters: value }));
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  options: string[] = ['Apple', 'Orange', 'Plum', 'Cherry'];
  sortOptions: string[] = ['Name', 'Artist', 'Date'];

  toText(value: string): string | null {
    return value ? value.toUpperCase() : null;
  }
}

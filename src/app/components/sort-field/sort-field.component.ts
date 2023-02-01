import { Component } from '@angular/core';

@Component({
  selector: 'app-sort-field',
  templateUrl: './sort-field.component.html',
  styleUrls: ['./sort-field.component.scss'],
})
export class SortFieldComponent {
  sortOptions: string[] = ['Name', 'Artist', 'Date'];

  toText(value: string): string | null {
    return value ? value.toUpperCase() : null;
  }
}

export enum SortField {
  Name = 'Name',
  Artist = 'Artist',
  Date = 'Date',
}

export type SortBy = SortField | null;

export const sortByOptions = Object.values(SortField);

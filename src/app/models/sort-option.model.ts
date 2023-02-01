export enum SortOption {
  Name = 'Name',
  Artist = 'Artist',
  Date = 'Date',
}

export type SortBy = SortOption | null;

export const sortOptions = Object.values(SortOption);

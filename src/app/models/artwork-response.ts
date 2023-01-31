import { Artwork } from './artwork';
import { Pagination } from './pagination';

export interface ArtworkResponse {
  pagination: Pagination;
  data: Artwork[];
  config: {
    iiif_url: string;
    website_url: string;
  };
}

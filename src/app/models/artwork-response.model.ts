import { Artwork } from './artwork.model';
import { Pagination } from './pagination.model';

export interface ArtworkResponse {
  pagination: Pagination;
  data: Artwork[];
  config: {
    iiif_url: string;
    website_url: string;
  };
}

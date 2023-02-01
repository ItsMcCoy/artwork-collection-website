export interface Artwork {
  id: number;
  title: string | null;
  alt_titles: string[] | null;
  image_id: string;
  artist_title: string | null;
  place_of_origin: string;
  date_start: number | null;
  date_end: number | null;
  style_titles: string[];
  medium_display: string;
}

import { Component, Input } from '@angular/core';
import { Artwork } from 'src/app/models';

@Component({
  selector: 'app-artwork-item',
  templateUrl: './artwork-item.component.html',
  styleUrls: ['./artwork-item.component.scss'],
})
export class ArtworkItemComponent {
  @Input() artwork?: Artwork;
  @Input() baseImageUrl: string | null = null;

  getCreationLocationAndPeriod(): string {
    const originalLocation = this?.artwork?.place_of_origin;
    const startYear = this.artwork?.date_start;
    const endYear = this.artwork?.date_end;
    if (startYear && endYear) {
      if (startYear === endYear) {
        return `${originalLocation} (${startYear})`;
      } else {
        return `${originalLocation} (${startYear} - ${endYear})`;
      }
    } else if (startYear || endYear) {
      return `${originalLocation} (${startYear || endYear})`;
    } else {
      return `${originalLocation}`;
    }
  }

  getImgSrc(): string {
    const imgId = this.artwork?.image_id;
    const baseUrl = this.baseImageUrl || '';
    return `${baseUrl}/${imgId}/full/843,/0/default.jpg`;
  }
}

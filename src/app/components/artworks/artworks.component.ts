import { Component, OnInit } from '@angular/core';
import { Artwork } from 'src/app/models';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss'],
})
export class ArtworksComponent implements OnInit {
  artworks: Artwork[] = [];

  constructor(private artworkService: ArtworkService) {}

  ngOnInit(): void {
    this.artworkService.getArtworks(1).subscribe((response) => {
      console.log(response.data);
      this.artworks = response.data;
    });
  }
}

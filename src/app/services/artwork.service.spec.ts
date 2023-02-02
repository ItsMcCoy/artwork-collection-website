import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ArtworkService } from './artwork.service';

describe('ArtworkService', () => {
  let service: ArtworkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ArtworkService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return artworks response', () => {
    service.getArtworks(1).subscribe((result) => {
      expect(result).toBeTruthy();
      expect(result.pagination).toBeTruthy();
      expect(result.data).toBeTruthy();
      expect(result.config).toBeTruthy();
    });

    const req = httpMock.expectOne(
      'https://api.artic.edu/api/v1/artworks?limit=8&page=1'
    );
    expect(req.request.method).toBe('GET');
    req.flush({
      pagination: {
        total: 119050,
        limit: 8,
        offset: 0,
        total_pages: 14882,
        current_page: 1,
        next_url: 'https://api.artic.edu/api/v1/artworks?page=2&limit=8',
      },
      data: [
        {
          id: 14556,
          api_model: 'artworks',
          api_link: 'https://api.artic.edu/api/v1/artworks/14556',
          is_boosted: false,
          title: 'Auvers, Panoramic View',
          alt_titles: null,
        },
      ],
      config: {
        iiif_url: 'https://www.artic.edu/iiif/2',
        website_url: 'http://www.artic.edu',
      },
    });
  });
});

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtworkResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ArtworkService {
  private readonly apiUrl = 'https://api.artic.edu/api/v1/artworks';
  private readonly limit = 8;

  constructor(private http: HttpClient) {}

  getArtworks(): Observable<ArtworkResponse> {
    const httpParams = new HttpParams().set('limit', this.limit).set('page', 1);

    return this.http.get<ArtworkResponse>(this.apiUrl, { params: httpParams });
  }
}

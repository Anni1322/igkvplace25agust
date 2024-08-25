import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  uploadImage(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);

    return this.http.post(`${this.baseUrl}/company/upload`, formData);
  }

  getImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/images`);
  }
}
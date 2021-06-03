import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadResponseModel } from '../models/upload-response-model';

@Injectable({
  providedIn: 'root'
})
export class ImgbbService {
  private readonly apiKey: string = '22b5884699fdd1c62abc806b7aacfba6';
  constructor(
    private readonly http: HttpClient
  ) { }

  uploadFile(file: File): Observable<UploadResponseModel> {
    const formData = new FormData();
    formData.append('image', file)
    const url = '/upload';

    return this.http
      .post<any>(url, formData, { params: { key: this.apiKey }});

  }
}

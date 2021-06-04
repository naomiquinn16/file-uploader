import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadResponseModel } from '../models/upload-response-model';
import { config } from '../../environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class ImgbbService {
  private readonly apiKey = config.MY_API_TOKEN;
  constructor(
    private readonly http: HttpClient
  ) { }

  uploadFile(file: File): Observable<UploadResponseModel> {
    console.log(file);
    const formData = new FormData();
    formData.append('image', file)
    const url = '/upload';

    return this.http
      .post<any>(url, formData, { params: { key: this.apiKey }});

  }
}

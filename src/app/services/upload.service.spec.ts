import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { UploadService } from './upload.service';
import { MockHttpClient, mockResponse } from './mock-data';
import { of } from 'rxjs';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UploadService,
          { provide: HttpClient, useClass: MockHttpClient },
      ]
    });

    service = TestBed.inject(UploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use the http client to post image to url', (done: DoneFn) => {
    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'post').and.returnValue(of(mockResponse));
    var file = new File([""], "filename", { type: 'text/html' });

    service.uploadFile(file).subscribe(res => {
        expect(httpClient.post).toHaveBeenCalled();
        expect(res).toEqual(mockResponse);
        done();
    });
  });

});

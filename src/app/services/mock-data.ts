import { MatSnackBarConfig } from "@angular/material/snack-bar";
import { Observable, of } from "rxjs";
import { UploadResponseModel } from "../models/upload-response-model";

export class MockHttpClient {
    post(url: string, body: any, params?: any): Observable<UploadResponseModel> {
      return of(mockResponse);
    }
}

export class MockMatSnackBar {
    open(message: string, action?: string, config?: MatSnackBarConfig) { }
  }

export const mockResponse = {
    data: {
    },
    success: true,
    status: 200
}
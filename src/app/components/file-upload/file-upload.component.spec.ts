import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MockMatSnackBar,
  MockHttpClient,
  mockResponse,
} from 'src/app/services/mock-data';
import { HttpClient } from '@angular/common/http';

import { UploadService } from '../../services/upload.service';

import { FileUploadComponent } from './file-upload.component';
import { throwError } from 'rxjs';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      providers: [
        { provide: MatSnackBar, useClass: MockMatSnackBar },
        { provide: HttpClient, useClass: MockHttpClient },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call create file list method on file upload', () => {
    const files = [
      {
        name: 'image',
        lastModified: '040621',
        size: 8,
        type: 'jpeg',
        progress: 0,
        webkitRelativePath: '',
      },
    ];
    const event = {
      target: {
        files: [files[0]],
      },
    };
    const creatFilesSpy = spyOn(component, 'createFilesList');
    component.onFileUploaded(event);
    expect(creatFilesSpy).toHaveBeenCalledWith(files);
  });

  it('should call create file list method on file drop', () => {
    const blob = new Blob([''], { type: 'text/html' });
    const file = <File>blob;
    const fileList = {
      0: file,
      length: 1,
      item: (index: number) => file,
    };
    const creatFilesSpy = spyOn(component, 'createFilesList');
    component.onFileDropped(fileList);
    expect(creatFilesSpy).toHaveBeenCalledWith(fileList);
  });

  it('should call upload file method when files list has been created', () => {
    const files = [
      {
        name: 'image',
        lastModified: '040621',
        size: 8,
        type: 'jpeg',
        progress: 0,
        webkitRelativePath: '',
      },
    ];
    const uploadSpy = spyOn(component, 'uploadFile');
    component.createFilesList(files);
    expect(uploadSpy).toHaveBeenCalledWith(files[0]);
  });

  it('should successfully upload the file', () => {
    const _uploadService = TestBed.inject(UploadService);
    const file = {
      name: 'image',
      lastModified: '040621',
      size: 8,
      type: 'jpeg',
      progress: 0,
      webkitRelativePath: '',
    };
    const uploadSpy = spyOn(_uploadService, 'uploadFile').and.callThrough();
    const toastSpy = spyOn(component, 'showToastMessage');

    component.uploadFile(file);

    expect(uploadSpy).toHaveBeenCalled();
    expect(toastSpy).toHaveBeenCalledWith(component.successMessage);
  });

  it('should NOT successfully upload the file', () => {
    const _uploadService = TestBed.inject(UploadService);
    const uploadSpy = spyOn(_uploadService, 'uploadFile').and.returnValue(
      throwError(new Error('something'))
    );
    const toastSpy = spyOn(component, 'showToastMessage');
    const file = {
      name: 'image',
      lastModified: '040621',
      size: 8,
      type: 'jpeg',
      progress: 0,
      webkitRelativePath: '',
    };
    component.uploadFile(file);

    expect(uploadSpy).toHaveBeenCalled();
    expect(toastSpy).toHaveBeenCalledWith(component.errorMessage);
  });

  it('should delete from files list', () => {
    component.files = [
      {
        name: 'image',
        lastModified: '040621',
        size: 8,
        type: 'jpeg',
        progress: 0,
        webkitRelativePath: '',
      },
      {
        name: 'image 2',
        lastModified: '12345',
        size: 4,
        type: 'gif',
        progress: 100,
        webkitRelativePath: '',
      },
    ];
    component.deleteFile(0);
    expect(component.files).toEqual([{
      name: 'image 2',
      lastModified: '12345',
      size: 4,
      type: 'gif',
      progress: 100,
      webkitRelativePath: '',
    }]);
  });

});

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImgbbService } from 'src/app/services/imgbb.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  //imageUploadForm: FormGroup;
  isImageUploadInProgress = false;
  uploadSuccess = false;

  constructor(
    private _formBuilder: FormBuilder,
    private readonly _imgbbService: ImgbbService
  ) { 

  }

  ngOnInit(): void {
  }

  onUpload(e: any) {
    const fileUploaded = e.target.files[0];
    this._imgbbService.uploadFile(fileUploaded).subscribe(response => {
      this.uploadSuccess = response.success;
    });
  }

}

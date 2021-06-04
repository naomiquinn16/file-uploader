import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { fileExtensionValidator } from 'src/app/directives/file-validation.directive';
import { UploadService } from 'src/app/services/upload.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }), 
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
         style({ 
           transform: 'scale(0.5)', opacity: 0, 
           height: '0px', margin: '0px' 
         })) 
      ])
    ]),
  ]
})

export class FileUploadComponent  {
  files: any = [];
  form: FormGroup;
  configSnackBar: MatSnackBarConfig<any> = {
    duration: 8000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: ['snackbar']
  };

  successMessage = 'You file has been successfully uploaded';
  errorMessage = 'Error occured while uploading file';

  constructor(
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private readonly _uploadService: UploadService
  ) {
    this.form = this._formBuilder.group({
        imageInput: ['jpeg', [Validators.required, fileExtensionValidator(
          'jpeg, gif, tif, tiff, png, svg, jfif')]
      ]
    });
  }

  onFileUploaded(event: any) {
    const filesUploaded = event.target.files;
    this.createFilesList(filesUploaded);
  }

  onFileDropped(filesDropped: FileList) {
    this.createFilesList(filesDropped);
  }

  createFilesList(filesUploaded: any) {
    for (const file of filesUploaded) {
      this.form.controls['imageInput'].setValue(file ? file.name : '');
      if (!this.form.controls['imageInput'].errors) {
            file.progress = 0;
            this.files.unshift(file);
            this.uploadFile(file);
      }
    }
  }

  uploadFile(file: any) {
    file.progress = 0;
    this._uploadService.uploadFile(file).subscribe(response => {
      if (response.status === 200) {
        file.progress = 100;
        file.color = 'primary'
        this.showToastMessage(this.successMessage);
      } else if (response.status === 500) {
        this.showToastMessage(this.errorMessage);
        file.progress = 15;
        file.color = 'accent'
      }
    }, (error) => {
      file.progress = 15;
      file.color = 'warn'
      this.showToastMessage(this.errorMessage);
    });
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  showToastMessage(message: string) {
    this._snackBar.open(message, 'X', this.configSnackBar);
  }

}

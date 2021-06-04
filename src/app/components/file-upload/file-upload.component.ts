import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ImgbbService } from 'src/app/services/imgbb.service';
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

export class FileUploadComponent implements OnInit {
  files: any = [];

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
    private readonly _imgbbService: ImgbbService
  ) {}

  ngOnInit(): void {
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
      file.progress = 0;
      this.files.unshift(file);
      this.uploadFile(file);
    }
  }

  uploadFile(file: any) {
    file.progress = 0;
    this._imgbbService.uploadFile(file).subscribe(response => {
      console.log(response)
      if (response.success) {
        file.progress = 100;
        this.showToastMessage(this.successMessage);
      } else {
        this.showToastMessage(this.errorMessage);
        file.progress = 15;
      }
    }, (error) => {
      file.progress = 15;
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

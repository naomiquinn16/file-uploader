import { Component, OnInit } from '@angular/core';
import { ImgbbService } from 'src/app/services/imgbb.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  files: any = [
    {
      lastModified: 1622731636224,
      lastModifiedDate: {},
      name: "example-image.jpeg",
      progress: 100,
      size: 82129,
      type: "image/jpeg",
      webkitRelativePath: ""
    }
  ];

  errorMessage = '';

  constructor(
    private readonly _imgbbService: ImgbbService
  ) {}

  ngOnInit(): void {
  }

  onFileUploaded(e: any) {
    const filesUploaded = e.target.files;
    this.createFilesList(filesUploaded);
  }

  onFileDropped(event: any) {
    this.createFilesList(event);
  }

  createFilesList(filesUploaded: Array<any>) {
    console.log(filesUploaded, "files sent to be prepared");
    for (const file of filesUploaded) {
      file.progress = 0;
      this.files.unshift(file);
      console.log(this.files, "this.files")
      this.uploadFile(file);
    }
  }

  uploadFile(file: any) {
    file.progress = 0;
    this._imgbbService.uploadFile(file).subscribe(response => {
      console.log(response)
      if (response.success) {
        file.progress = 100;
      }
    }, (error) => {
      file.progress = 0;
      this.errorMessage = 'Error occured while uploading file';
    });
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

}

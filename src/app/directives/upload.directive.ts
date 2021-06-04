import { 
  Directive, Output, EventEmitter, 
  HostListener, HostBinding 
}
from '@angular/core';

@Directive({
  selector: '[fileDrop]'
})
export class UploadDirective {
  @Output() onFileDropped = new EventEmitter<any>();
  @HostBinding('class.fileover') fileOver = false;
  @HostBinding('style.background-color') public background = '#fff';
  @HostBinding('style.opacity') public opacity = '1';
  constructor() { }
  
  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(e:any) {
    e.preventDefault();
    e.stopPropagation();
    this.fileOver = true;
  }

   // Dragleave listener
   @HostListener('dragleave', ['$event']) public onDragLeave(e:any) {
    e.preventDefault();
    e.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(e:any) {
    e.preventDefault();
    e.stopPropagation();

    this.background = '#f5fcff'
    this.opacity = '1'
    
    this.fileOver = false;
    let files = e.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }

}

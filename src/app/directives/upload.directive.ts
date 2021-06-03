import { 
  Directive, Output, EventEmitter, 
  HostBindingDecorator, HostListener, HostBinding 
}
from '@angular/core';

@Directive({
  selector: '[fileUpload]'
})
export class UploadDirective {
  @Output() onFileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') public background = '#fff';
  @HostBinding('style.opacity') public opacity = '1';
  constructor() { }
  // Mouse over listener, when something is dragged over our host element
  @HostListener('mouseover', ['$event']) onMouseOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }

  @HostListener('drop', ['$event']) public onDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
    let files = e.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
      console.log(`You dropped ${files.length} files`)
    }
  }

  //Drave leave listener, when something is dragged away from our host element
  @HostListener('mouseleave', ['$event']) public onDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.background = '#fff'
    this.opacity = '1'
  }

}

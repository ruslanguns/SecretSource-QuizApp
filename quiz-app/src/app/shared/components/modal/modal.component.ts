import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() initialStatus: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  
  get open() {
    return this.initialStatus;
  }

  close() {
    this.initialStatus = false;
    this.onClose.emit(false);
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() open: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  close() {
    this.onClose.emit(false);
  }

}

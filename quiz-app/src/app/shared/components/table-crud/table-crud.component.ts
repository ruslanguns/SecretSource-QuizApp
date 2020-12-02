import { Component, EventEmitter, Input, Output, PipeTransform, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ITableData {
  [key: string]: any;
}

export interface ITableOptions {
  /**
   * ## Provide the column key
   * this should fit the name of the elements in the dataTable
   */
  [key: string]: {
    name?: string;
    /**
     * Transform the column content using pipes
     * @experimental option
     * You will be able to transform your data type into the desired one using pipes.
     * If true, you need to provide transformOption key and usePipe, example:
     * ```ts
     * const tableOptions: ITableOptions[] = [
     *  {
     *    columnName: {
     *      name: 'Column Name',
     *      transformOptions: {
     *        usePipe: UpperCasePipe // type PipeTransform
     *      }
     *    }
     *  }
     * ]
     * ```
     */
    transformOptions?: {
      usePipe: PipeTransform,
      pipeArgs?: Array<any>
    },
    /**
     * Use css classes to transform the cell content
     */
    styleClass?: string
  }
}

@Component({
  selector: 'app-table-crud',
  templateUrl: './table-crud.component.html',
  styleUrls: ['./table-crud.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TableCrudComponent {

  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  @Input() dataTable: ITableData[] = [];
  get columnKeys(): string[] {
    return Object.keys(this.dataTable[0]);
  }
  @Input() tableOptions?: ITableOptions;

  constructor() {}

  onEditClick(row: any) {
    this.onEdit.emit(row);
  }

  onDeleteClick(row: any) {
    this.onDelete.emit(row);
  }

}

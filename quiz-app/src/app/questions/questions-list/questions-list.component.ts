import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ITableOptions } from 'src/app/shared/components/table-crud/table-crud.component';
import { IsPublishedPipe } from 'src/app/shared/pipes';


const mock_data_table = [
  {
    id: 1,
    question: 'How to became millonarie?',
    status: 0,
    category: 'general'
  },
  {
    id: 2,
    question: 'How to became millonarie?',
    status: 0,
    category: 'general'
  },
  {
    id: 3,
    question: 'How to became millonarie?',
    status: 0,
    category: 'general'
  },
  {
    id: 4,
    question: 'How to became millonarie?',
    status: 0,
    category: 'general'
  },
  {
    id: 5,
    question: 'How to became millonarie?',
    status: 0,
    category: 'general'
  }
];


@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {
  dataTable = mock_data_table;
  tableOptions: ITableOptions = {
    id: {
      name: 'Id',
    },
    question: {
      name: 'Question',
    },
    status: {
      name: 'Status',
      transformOptions: {
        usePipe: new IsPublishedPipe()
      },
      styleClass: 'badge info'
    },
    category: {
      name: 'Category',
      transformOptions: {
        usePipe: new TitleCasePipe()
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(event: any) {
    console.log(`Editing — ${event?.id}`)
  }
  
  onDelete(event: any) {
    console.log(`Deleting — ${event?.id}`)
  }

}

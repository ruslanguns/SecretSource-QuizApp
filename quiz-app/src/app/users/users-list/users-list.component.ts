import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ITableOptions } from 'src/app/shared/components/table-crud/table-crud.component';

const mock_data_table = [
  {
    "id": 1,
    "username": "ruslanguns",
    "roles": [
      "ADMIN"
    ],
    "createdAt": "2020-11-17T01:10:25.171Z"
  },
  {
    "id": 2,
    "username": "player1",
    "roles": [
      "PLAYER"
    ],
    "createdAt": "2020-11-25T01:38:21.734Z"
  },
  {
    "id": 3,
    "username": "player2",
    "roles": [
      "PLAYER"
    ],
    "createdAt": "2020-11-25T01:40:07.364Z"
  },
  {
    "id": 4,
    "username": "ilse",
    "roles": [
      "PLAYER"
    ],
    "createdAt": "2020-11-25T09:09:32.720Z"
  },
  {
    "id": 5,
    "username": "ruslan",
    "roles": [
      "PLAYER"
    ],
    "createdAt": "2020-11-25T09:29:18.641Z"
  },
  {
    "id": 6,
    "username": "iban",
    "roles": [
      "PLAYER"
    ],
    "createdAt": "2020-11-25T09:41:18.349Z"
  },
  {
    "id": 7,
    "username": "player3",
    "roles": [
      "PLAYER"
    ],
    "createdAt": "2020-11-25T15:37:58.719Z"
  },
  {
    "id": 8,
    "username": "player",
    "roles": [
      "PLAYER"
    ],
    "createdAt": "2020-11-25T23:35:08.505Z"
  },
  {
    "id": 9,
    "username": "player4",
    "roles": [
      "PLAYER"
    ],
    "createdAt": "2020-11-25T23:36:56.128Z"
  },
  {
    "id": 10,
    "username": "asdf",
    "roles": [
      "PLAYER"
    ],
    "createdAt": "2020-11-25T23:56:50.105Z"
  },
  {
    "id": 11,
    "username": "ruslanguns1",
    "roles": [
      "PLAYER"
    ],
    "createdAt": "2020-11-26T08:57:19.711Z"
  }
];

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  dataTable = mock_data_table;
  tableOptions: ITableOptions = {
    id: {
      name: 'Id'
    },
    username: {
      name: 'Username'
    },
    roles: {
      name: 'Roles'
    },
    createdAt: {
      name: 'Created at',
      transformOptions: {
        usePipe: new DatePipe('en_EN')
      }
    }
  };
  

  onEdit(event: any) {
    console.log(`Editing — ${event?.id}`)
  }
  
  onDelete(event: any) {
    console.log(`Deleting — ${event?.id}`)
  }

}

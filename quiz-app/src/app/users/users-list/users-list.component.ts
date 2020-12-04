import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { LoadingService, UsersService } from 'src/app/core/services';
import { ITableOptions } from 'src/app/shared/components/table-crud/table-crud.component';
import { IUser } from 'src/app/shared/interfaces';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  tableOptions: ITableOptions = {
    id: {
      name: 'Id'
    },
    username: {
      name: 'Username'
    },
    roles: {
      name: 'Roles',
      styleClass: 'badge success',
    },
    createdAt: {
      name: 'Registered at',
      transformOptions: {
        usePipe: new DatePipe('en_EN')
      }
    }
  };

  users$: Observable<IUser[]> = this.usersService.getUsers();
  loading$ = this.loadingService.loadingSub.pipe(delay(0));
  deleteModal = false;
  selectedUser?: IUser;

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {
    this.users$.pipe(
      catchError((error) => {
        this.toastr.error(error);
        return EMPTY;
      })
    );
  }
  
  refreshUsers() {
    this.users$ = this.usersService.refreshUsers();
  }
  
  onDelete(user: IUser) {
    this.selectedUser = user;
    this.openOnDeleteModal();
  }

  openOnDeleteModal() {
    this.deleteModal = true;
  }

  closeOnDeleteModal() {
    this.deleteModal = false;
    this.selectedUser = undefined;
  }

  deleteQuestion() {
    if (this.selectedUser) {
      this.usersService.deleteUser(this.selectedUser.id)
        .subscribe(
          () => (this.closeOnDeleteModal()),
          error => (this.toastr.error(error))
        );
    }
  }

}

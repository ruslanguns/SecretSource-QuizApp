import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StoreService, UsersService } from '../core/services';
import { Role } from '../shared/enums/role.enum';
import { IQuestion, IUser } from '../shared/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  Role = Role;
  questionFormModal = false;
  latestQuestions$: Observable<IQuestion[]> = this.store.select<IQuestion[]>('questions')
    .pipe(
      map(questions => questions && questions.sort((a: any, b: any) => (b.id - a.id))),
      map(questions => questions.slice(0, 5))
    )
  latestUsers$: Observable<IUser[]> = this.userservicce.getUsers()
    .pipe(
      map(users => users && users.sort((a: any, b: any) => (b.id - a.id))),
      map(users => users.slice(0, 5))
    )

  constructor(
    private userservicce: UsersService,
    private store: StoreService
  ) {}

  openQuestionFormModal() {
    this.questionFormModal = true;
  }

  closeQuestionFormModal() {
    this.questionFormModal = false;
  }

}

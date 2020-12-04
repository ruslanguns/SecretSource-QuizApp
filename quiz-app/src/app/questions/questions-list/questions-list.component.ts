import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { LoadingService, QuestionsService } from 'src/app/core/services';
import { ITableOptions } from 'src/app/shared/components/table-crud/table-crud.component';
import { IQuestion } from 'src/app/shared/interfaces';
import { IsPublishedPipe, TruncatePipe } from 'src/app/shared/pipes';


@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsListComponent {
  tableOptions: ITableOptions = {
    question: {
      name: 'Question',
      transformOptions: {
        usePipe: new TruncatePipe(),
      },
    },
    status: {
      name: 'Status',
      transformOptions: {
        usePipe: new IsPublishedPipe(),
      },
      styleClass: 'badge info',
    },
    category: {
      name: 'Category',
      transformOptions: {
        usePipe: new TitleCasePipe(),
      },
    },
  };

  questions$: Observable<IQuestion[]> = this.questionService.getQuestions();
  loading$ = this.loadingService.loadingSub.pipe(delay(0));
  deleteModal = false;
  selectedQuestion?: IQuestion;

  constructor(
    private questionService: QuestionsService,
    private toastr: ToastrService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.questions$.pipe(
      catchError((error) => {
        this.toastr.error(error);
        return EMPTY;
      })
    );
  }

  refreshQuestions() {
    this.questions$ = this.questionService.refreshQuestions();
  }

  onEdit(question: IQuestion) {
    this.selectedQuestion = question;
    this.router.navigate(['questions', question.id]);
  }

  onDelete(question: IQuestion) {
    this.selectedQuestion = question;
    this.openOnDeleteModal();
  }

  openOnDeleteModal() {
    this.deleteModal = true;
  }

  closeOnDeleteModal() {
    this.deleteModal = false;
    this.selectedQuestion = undefined;
  }

  deleteQuestion() {
    if (this.selectedQuestion) {
      this.questionService.deleteQuestion(this.selectedQuestion.id)
        .subscribe(
          () => (this.closeOnDeleteModal()),
          error => (this.toastr.error(error))
        );
    }
  }
}

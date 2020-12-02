import { TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionsService, StoreService } from 'src/app/core/services';
import { ITableOptions } from 'src/app/shared/components/table-crud/table-crud.component';
import { IQuestion } from 'src/app/shared/interfaces';
import { IsPublishedPipe, TruncatePipe } from 'src/app/shared/pipes';


@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit, OnDestroy {
  dataTable: IQuestion[] = [];
  tableOptions: ITableOptions = {
    question: {
      name: 'Question',
      transformOptions: {
        usePipe: new TruncatePipe()
      }
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

  questionsSubs?: Subscription;
  loading = false;

  deleteModal = false;
  selectedQuestion?: IQuestion;

  constructor(
    private questionService: QuestionsService,
    private toastr: ToastrService,
    private store: StoreService,
    private router: Router
  ) { }

  
  ngOnInit() {
    this.loading = true;
    const questionService$ = this.questionService.getQuestions();
    const questionStore$ = this.store.select<IQuestion[]>('questions');
    this.questionsSubs = combineLatest([
      questionService$,
      questionStore$
    ]).pipe(
        map(([service, store]) => {
          return store;
        })
      )
      .subscribe(
        questions => (
          this.dataTable = questions,
          this.loading = false
        ),
        error => (
          this.toastr.error(error),
          this.loading = false
        )
      );
  }
  
  ngOnDestroy() {
    this.questionsSubs?.unsubscribe();
  }

  onEdit(question: IQuestion) {
    this.selectedQuestion = question;
    this.router.navigate(['questions', question.id ])
  }
  
  onDelete(question: IQuestion) {
    this.selectedQuestion = question;
    this.openOnDeleteModal();
  }

  openOnDeleteModal(){
    this.deleteModal = true;
  }

  closeOnDeleteModal(){
    this.deleteModal = false;
    this.selectedQuestion = undefined;
  }

  deleteQuestion() {
    if(this.selectedQuestion) {
      const questions = this.store.value.questions.filter(x => x.id !== this.selectedQuestion?.id);
      this.questionService.deleteQuestion(this.selectedQuestion.id).subscribe();
      this.store.set('questions', questions);
    }
    this.closeOnDeleteModal();
  }

}

import { TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { QuestionsService } from 'src/app/core/services';
import { ITableOptions } from 'src/app/shared/components/table-crud/table-crud.component';
import { IQuestion } from 'src/app/shared/interfaces';
import { IsPublishedPipe } from 'src/app/shared/pipes';


@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit, OnDestroy {
  dataTable: IQuestion[] = [];
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

  questionsSubs?: Subscription;
  loading = false;

  constructor(
    private questionService: QuestionsService,
    private toastr: ToastrService
  ) { }

  
  ngOnInit() {
    this.loading = true;
    this.questionsSubs = this.questionService.getQuestions()
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

  onEdit(event: any) {
    console.log(`Editing — ${event?.id}`)
  }
  
  onDelete(event: any) {
    console.log(`Deleting — ${event?.id}`)
  }

}

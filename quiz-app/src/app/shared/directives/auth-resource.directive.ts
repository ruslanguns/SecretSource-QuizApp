import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { QuestionsService, StoreService } from 'src/app/core/services';

@Directive({
  selector: '[appAuthResource]',
})
export class AuthResourceDirective implements OnInit, OnDestroy {
  private onDestroy = new Subject();

  constructor(
    private store: StoreService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.store
      .select<boolean>('isAuthorized')
      .pipe(
        takeUntil(this.onDestroy),
        distinctUntilChanged()
      ).subscribe((hasAccess) => {
        hasAccess
          ? this.viewContainer.createEmbeddedView(this.templateRef)
          : this.viewContainer.clear();
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}

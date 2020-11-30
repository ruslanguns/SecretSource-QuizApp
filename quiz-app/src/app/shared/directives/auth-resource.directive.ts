import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { StoreService } from 'src/app/core/services';

@Directive({
  selector: '[appAuthResource]',
})
export class AuthResourceDirective implements OnInit, OnDestroy {
  subscription: Subscription | undefined;

  constructor(
    private store: StoreService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select<boolean>('isAuthorized')
      .pipe(distinctUntilChanged())
      .subscribe((hasAccess) => {
        hasAccess
          ? this.viewContainer.createEmbeddedView(this.templateRef)
          : this.viewContainer.clear();
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

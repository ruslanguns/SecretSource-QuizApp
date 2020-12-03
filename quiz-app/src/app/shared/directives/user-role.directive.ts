import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AuthService, StoreService } from 'src/app/core/services';
import { Role } from '../enums/role.enum';


@Directive({
  selector: '[appUserRole]'
})
export class UserRoleDirective implements OnInit, OnDestroy {

  userRoles: Role[] = [];
  private onDestroy = new Subject();

  @Input()
  set appUserRole(roles: Role[]) {
    if(!roles || !roles.length) {
      throw new Error('Roles value is empty or missed')
    }
    this.userRoles = roles;
  }

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: StoreService
  ) { }

  ngOnInit() {
    this.store.select('isAuthorized')
      .pipe(
        takeUntil(this.onDestroy),
        distinctUntilChanged()
      )
      .subscribe(hasAccess => {
        if (hasAccess && this.userRoles) {
          hasAccess = this.userRoles.some((role) => this.authService.hasRole(role));
        }
        (hasAccess)
          ? this.viewContainer.createEmbeddedView(this.templateRef)
          : this.viewContainer.clear();
      })
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}

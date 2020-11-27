import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, StoreService } from 'src/app/core/services';
import { Role } from '../enums/role.enum';


// TODO: make it reactive
@Directive({
  selector: '[appUserRole]'
})
export class UserRoleDirective implements OnInit, OnDestroy {

  userRoles: Role[] = [];
  subscription: Subscription | undefined;

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
    this.subscription = this.store.select('isAuthorized')
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
    this.subscription?.unsubscribe();
  }

}

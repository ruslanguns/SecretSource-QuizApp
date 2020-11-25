import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { IState } from 'src/app/shared/interfaces';

const initialState: IState = {
  user: null,
  accessToken: localStorage.getItem('accessToken') || undefined,
  isLoggedIn: false,
  isLoading: false,
  errorMessage: null
}

export class StoreService {

  private subject = new BehaviorSubject<IState>(initialState);
  private store = this.subject
    .asObservable()
    .pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store
      .pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({
      ...this.value, [name]: state
    });
  }
  
}
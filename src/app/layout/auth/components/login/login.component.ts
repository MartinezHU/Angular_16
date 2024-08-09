import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { LoginRequest } from 'src/app/shared/models/entities/loginrequest.model';
import { Message } from 'src/app/shared/models/entities/message.model';
import { removeMessages, loginRequest } from '../../store/actions/auth.actions';
import { selectMessages } from '../../store/selectors/auth.selectors';
import { AuthState } from '../../store/state/auth.state';
import * as MessagesActions from '../../../../shared/messages/store/actions/messages.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  loginForm!: FormGroup;

  loginMessages$: Observable<Message[]> = new Observable<Message[]>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ authState: AuthState }>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loginMessages$ = this.store.pipe(select(selectMessages));

    this.loginMessages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((messages: Message[]) => {
        console.log(messages);
        if (messages.length > 0) {
          this.store.dispatch(
            MessagesActions.setMessage({ payload: messages })
          );
          this.store.dispatch(removeMessages());
        }
      });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(
        loginRequest({ loginRequest: new LoginRequest(username, password) })
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

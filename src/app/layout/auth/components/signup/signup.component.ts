import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { removeMessages, signUpRequest } from '../../store/actions/auth.actions';
import { AuthState } from '../../store/state/auth.state';
import { SignUpRequest } from 'src/app/shared/models/entities/signuprequest.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Message } from 'src/app/shared/models/entities/message.model';
import { selectMessages } from '../../store/selectors/auth.selectors';
import * as MessagesActions from '../../../../shared/messages/store/actions/messages.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  registerForm!: FormGroup;

  signUpMessages$: Observable<Message[]> = new Observable<Message[]>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ authState: AuthState }>
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
    });

    this.signUpMessages$ = this.store.pipe(select(selectMessages));

    this.signUpMessages$
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
    if (this.registerForm.valid) {
      const { username, password1, password2, email } =
        this.registerForm.value;
        console.log(this.registerForm.value)
      this.store.dispatch(
        signUpRequest({
          signUpRequest: new SignUpRequest(
            username,
            password1,
            password2,
            email
          ),
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

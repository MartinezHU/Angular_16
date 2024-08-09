import { Component } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil, filter } from 'rxjs';
import { MessageState } from './store/state/message.state';
import * as MessagesActions from './store/actions/messages.actions';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();

  messageState: MessageState = new MessageState();

  constructor(
    private store: Store<{ messagesState: MessageState }>,
    private actionSubject: ActionsSubject,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.messagesState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: MessageState) => {
        this.messageState = state;

        if (this.messageState.msgs.length > 0) {
          this.messageState.msgs.forEach((message) => {
            if (message.severity === 'error') {
              this.showNotification(message.summary, 'error');
            } else if (message.severity === 'info') {
              this.showNotification(message.summary, 'info');
            } else {
              this.showNotification(message.summary, 'success');
            }
          });
        }
      });

    this.actionSubject
      .pipe(takeUntil(this.destroy$))
      .pipe(filter((action) => action === MessagesActions.removeAllMessages))
      .subscribe(() => {
        console.log("prubeas");
        this.toastr.clear();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  showNotification(
    summary: string | undefined,
    severity: 'success' | 'info' | 'warning' | 'error'
  ): void {
    if (summary) {
      this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
      this.toastr.toastrConfig.timeOut = 5000;
      this.toastr[severity](summary);
    }

  }
}

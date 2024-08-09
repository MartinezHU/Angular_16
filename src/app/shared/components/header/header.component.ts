import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { OpenSidebar } from '../../base-layout/store/actions/base-layout.actions';
import { selectOpened } from '../../base-layout/store/selectors/base-layout.selectors';
import { BaseLayoutState } from '../../base-layout/store/states/base-layout.state';
import { Message } from '../../models/entities/message.model';
import * as MessagesActions from '../../messages/store/actions/messages.actions';
import { AuthState } from 'src/app/layout/auth/store/state/auth.state';
import { AuthenticationService } from 'src/app/layout/auth/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  leftMenuItems: any[] = [];
  rightMenuItems: any[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();
  opened$: Observable<boolean> = new Observable<boolean>();
  opened: boolean = false;

  isAuth$: Observable<boolean> = new Observable<boolean>();
  isAuth: boolean = false;
  profile_img?: string;

  constructor(
    private router: Router,
    private store: Store<{
      baseLayoutState: BaseLayoutState;
      authState: AuthState;
    }>,
    private authService: AuthenticationService
  ) {
    this.leftMenuItems = [
      { name: 'Inicio', link: '/', icon: 'home' },
      { name: 'Acerca de', link: 'about', icon: '' },
      { name: 'Contacto', link: 'contact', icon: '' },
    ];

    this.rightMenuItems = [
      { name: 'Iniciar sesión', link: 'login', icon: 'home' },
      { name: 'Registrarse', link: 'signup', icon: '' },
    ];
  }

  ngOnInit(): void {
    this.authService.isAuthenticated();

    this.profile_img = this.authService.getProfilePic();

    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuth = isAuthenticated;
    });

    this.opened$ = this.store.pipe(select(selectOpened));

    this.opened$.pipe(takeUntil(this.destroy$)).subscribe((opened: boolean) => {
      this.opened = opened;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onOpened() {
    this.store.dispatch(OpenSidebar({ payload: (this.opened = !this.opened) }));
  }

  logout() {
    this.authService.logout();

    let messages: Message[] = [];
    let message = new Message();
    message.summary = 'Haz cerrado sesión';
    message.severity = 'success';
    messages.push(message);
    this.store.dispatch(MessagesActions.setMessage({ payload: messages }));
    this.router.navigateByUrl('/');
  }
}

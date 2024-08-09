import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { selectOpened } from './store/selectors/base-layout.selectors';
import { BaseLayoutState } from './store/states/base-layout.state';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private opened$: Observable<boolean> = new Observable<boolean>();
  public opened: boolean = false;

  constructor(private store: Store<BaseLayoutState>) {}

  ngOnInit(): void {
    this.opened$ = this.store.pipe(select(selectOpened));

    this.opened$.pipe(takeUntil(this.destroy$)).subscribe((opened: boolean) => {
      this.opened = opened;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

import { Component, OnInit, ChangeDetectionStrategy, Input, Output, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoFrameComponent implements OnInit, OnDestroy {
  @Output() liked = new Subject<void>();
  @Input() description = '';
  @Input() src = '';
  @Input() likes = 0;

  debounceTime$ = new Subject<void>();
  clickedClass$ = new Subject<string>();
  widgetEnabled$ = new Subject<boolean>();
  unsubscribe$ = new Subject<void>();

  fileToUpload: File | null = null;

  constructor() { }

  ngOnInit(): void {
    this.debounceTime$.pipe(
      debounceTime(500),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => this.liked.next());
  }

  like = () => this.debounceTime$.next();

  enableWidget = () => this.widgetEnabled$.next(Boolean(true))

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

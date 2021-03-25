import { Component, EventEmitter, Input, Output } from '@angular/core';
import type {
  ResultEntry,
  ResultEntryActionEvent,
  ResultViewType,
} from '../search-service/search.types';
import { defaultConfig } from '../default.config';

@Component({
  selector: 'amsui-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  @Input() results: ResultEntry[] = [];
  @Input() resultType!: ResultViewType;
  @Input() highlightingActivated = defaultConfig.highlightingActivated;
  @Output() resultActionClicked = new EventEmitter<ResultEntryActionEvent>();

  constructor() {}

  emitActionEvent(resultEntryAction: ResultEntryActionEvent): void {
    this.resultActionClicked.emit(resultEntryAction);
  }
}

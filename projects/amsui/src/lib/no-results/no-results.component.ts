import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { NoResultsConfig } from '../search-service/search.types';
import { defaultConfig } from '../default.config';
import { ResultEntryActionEvent } from '../search-service/search.types';
import { NoResultsText } from '../text.types';

@Component({
  selector: 'amsui-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss'],
})
export class NoResultsComponent {
  @Input() config: NoResultsConfig = defaultConfig.noResultsConfig;
  @Input() noResultsText?: NoResultsText;
  @Output() didYouMeanEvent = new EventEmitter<string>();
  @Output() resultActionClicked = new EventEmitter<ResultEntryActionEvent>();

  constructor() {}

  greaterNumberOfSearchKeyword(): boolean {
    return this.config.searchKeyword.split(' ').length > 1;
  }

  didYouMeanClick(didYouMean: string): void {
    this.didYouMeanEvent.emit(didYouMean);
  }

  getPhoneNumberWithoutSpaces(): string {
    return this.config.contactPhoneNumber?.replace(/\s/g, '') || '';
  }

  emitResultActionClicked(resultEntryAction: ResultEntryActionEvent): void {
    this.resultActionClicked.emit(resultEntryAction);
  }
}

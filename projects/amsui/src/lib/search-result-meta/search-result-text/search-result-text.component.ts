import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { SearchResultMeta } from '../../search-service/search.types';
import { defaultConfig } from '../../default.config';
import type { SearchResultText } from '../../text.types';

@Component({
  selector: 'amsui-search-result-text',
  templateUrl: './search-result-text.component.html',
  styleUrls: ['./search-result-text.component.scss'],
})
export class SearchResultTextComponent {
  @Input() searchResultMeta: SearchResultMeta = defaultConfig.searchResultMeta;
  @Input() text?: SearchResultText;
  @Output() didYouMeanEvent = new EventEmitter<string>();

  constructor() {}

  roundTo3Decimals(num: number): number {
    return Math.round((num / 1000 + Number.EPSILON) * 1000) / 1000;
  }

  didYouMeanClick(didYouMeanValue: string): void {
    this.didYouMeanEvent.emit(didYouMeanValue);
  }
}

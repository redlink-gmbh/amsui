import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import type {
  NoResultsConfig,
  ResultEntry,
  ResultEntryActionEvent,
  ResultViewConfig,
  ResultViewType,
  SearchResultMeta,
} from '../search-service/search.types';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Breakpoints } from '../breakpoints';
import { defaultConfig } from '../default.config';
import { MatTabChangeEvent } from '@angular/material/tabs';
import type { SearchResultsWrapperText } from '../text.types';

@Component({
  selector: 'amsui-search-results-wrapper',
  templateUrl: './search-results-wrapper.component.html',
  styleUrls: ['./search-results-wrapper.component.scss'],
})
export class SearchResultsWrapperComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input() searchResultMeta: SearchResultMeta = defaultConfig.searchResultMeta;
  @Input() set resultViewConfig(viewConfig: ResultViewConfig) {
    this.viewConfig = {
      ...this.viewConfig,
      ...viewConfig,
    };
  }
  @Input() noResultsConfig: NoResultsConfig = defaultConfig.noResultsConfig;
  @Input() set searchResults(searchResults: ResultEntry[]) {
    this.results = [...searchResults];
    this.originalResults = [...searchResults];
  }
  @Input() searchResultsWrapperText?: SearchResultsWrapperText;
  @Output() didYouMeanEvent = new EventEmitter<string>();
  @Output() loadMoreEvent = new EventEmitter<void>();
  @Output() filterChangedEvent = new EventEmitter<string>();
  @Output() resultActionClicked = new EventEmitter<ResultEntryActionEvent>();

  results: ResultEntry[] = [];
  isMobile = false;
  loadMoreToggle = false;
  showErrorLoadMore = false;
  selectedFilterIndex = 0;
  viewConfig: ResultViewConfig = defaultConfig.resultViewConfig;
  private activeSortingType = '';
  private breakpointSubscription!: Subscription;
  private originalResults: ResultEntry[] = [];
  private loadMoreTimeout = -1;

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.originalResults = this.results;
    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.Mobile])
      .pipe(map((result) => result.matches))
      .subscribe((mobileCheck) => (this.isMobile = mobileCheck));
  }

  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.activeSortingType &&
      changes.searchResultInfo &&
      changes.searchResultInfo.previousValue.keyword ===
        changes.searchResultInfo.currentValue.keyword
    ) {
      this.sortByType(this.activeSortingType);
    }
    if (changes.searchResults) {
      this.loadMoreToggle = false;
      this.showErrorLoadMore = false;
      clearTimeout(this.loadMoreTimeout);
    }
  }

  sortByType(sortingType: string): void {
    if (sortingType === 'title') {
      this.results = [
        ...this.results.sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        ),
      ];
    } else if (sortingType === 'relevance') {
      this.results = [...this.originalResults];
    }
  }

  handleSortChange(sortingType: string): void {
    this.activeSortingType = sortingType;
    this.sortByType(sortingType);
  }

  changeResultType(resultType: ResultViewType): void {
    this.viewConfig.selectedResultViewType = resultType;
  }

  didYouMeanClick(didYouMeanValue: string): void {
    this.didYouMeanEvent.emit(didYouMeanValue);
  }

  loadMore(): void {
    this.showErrorLoadMore = false;
    this.loadMoreToggle = true;
    this.loadMoreEvent.emit();
    this.loadMoreTimeout = window.setTimeout(() => {
      if (this.loadMoreToggle) {
        this.loadMoreToggle = false;
        this.showErrorLoadMore = true;
      }
    }, 10000);
  }

  emitFilterChangedEvent(matTabChangeEvent: MatTabChangeEvent): void {
    this.filterChangedEvent.emit(matTabChangeEvent.tab.textLabel);
  }

  emitResultActionClicked(resultEntryAction: ResultEntryActionEvent): void {
    this.resultActionClicked.emit(resultEntryAction);
  }
}

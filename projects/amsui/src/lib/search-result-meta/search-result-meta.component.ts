import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import type {
  MetaResultViewConfig,
  ResultViewType,
  SearchResultMeta,
} from '../search-service/search.types';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Breakpoints } from '../breakpoints';
import { Subscription } from 'rxjs';
import { getDefaultSortingOptionValue } from './sorting-select/sorting-select.utils';
import { defaultConfig } from '../default.config';
@Component({
  selector: 'amsui-search-result-meta',
  templateUrl: './search-result-meta.component.html',
  styleUrls: ['./search-result-meta.component.scss'],
})
export class SearchResultMetaComponent implements OnInit, OnDestroy, OnChanges {
  @Input() searchResultMeta: SearchResultMeta = defaultConfig.searchResultMeta;

  @Input() set metaResultViewConfig(
    metaResultViewConfig: MetaResultViewConfig
  ) {
    this.metaViewConfig = {
      ...this.metaViewConfig,
      ...metaResultViewConfig,
    };
  }
  @Output() sortingChanged = new EventEmitter<string>();
  @Output() resultViewTypeChanged = new EventEmitter<ResultViewType>();
  @Output() didYouMeanEvent = new EventEmitter<string>();
  defaultSortingOption = '';
  activeSortingOption = '';
  isMobile = false;
  metaViewConfig: MetaResultViewConfig = defaultConfig.metaViewConfig;
  private breakpointSubscription!: Subscription;

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.Mobile])
      .pipe(map((result) => result.matches))
      .subscribe((mobileCheck) => (this.isMobile = mobileCheck));
    if (this.metaViewConfig.sortingOptions) {
      this.defaultSortingOption = getDefaultSortingOptionValue(
        this.metaViewConfig.sortingOptions
      );
    }
    this.activeSortingOption = this.defaultSortingOption;
  }

  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.searchResultMeta &&
      !changes.searchResultMeta.firstChange &&
      changes.searchResultMeta.currentValue.keyword !==
        changes.searchResultMeta.previousValue.keyword
    ) {
      this.activeSortingOption = this.defaultSortingOption;
    }
  }

  emitSortEvent(sortingType: string): void {
    this.activeSortingOption = sortingType;
    this.sortingChanged.emit(sortingType);
  }

  emitResultViewTypeChange(resultViewType: ResultViewType): void {
    this.resultViewTypeChanged.emit(resultViewType);
  }

  didYouMeanClick(didYouMeanValue: string): void {
    this.didYouMeanEvent.emit(didYouMeanValue);
  }
}

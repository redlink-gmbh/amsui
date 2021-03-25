import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Breakpoints } from '../breakpoints';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import type {
  SearchFieldConfig,
  SuggestionParameter,
} from '../search-service/search.types';
import { defaultConfig } from '../default.config';
import {
  getSearchKeywordFromURL,
  resetToQueryParam,
} from '../search-params.util';

@Component({
  selector: 'amsui-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  @Input() set config(config: SearchFieldConfig) {
    this.searchFieldConfig = {
      ...this.searchFieldConfig,
      ...config,
    };
    this.checkValueInput(this.searchFieldConfig.value);
  }
  @Output() searchEvent = new EventEmitter<string>();
  @Output() inputEvent = new EventEmitter<SuggestionParameter>();
  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;
  searchControl = new FormControl();
  filteredSuggestions$: Observable<string[]> = of([]);
  isMobile = false;
  isTablet = false;
  isLoading = false;
  numberOfSuggestions = defaultConfig.numberOfSuggestions;
  defaultValueForDropDownMode = '';
  searchFieldConfig: SearchFieldConfig = defaultConfig.searchFieldConfig;
  private searchQueryParamKey = 'q';
  private breakpointSubscription!: Subscription;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    if (this.searchFieldConfig.addQueryToURLParams) {
      this.searchControl.setValue(
        getSearchKeywordFromURL(
          window.location.search,
          this.searchQueryParamKey
        )
      );
    }
  }

  ngOnInit(): void {
    if (
      this.searchFieldConfig.asyncSuggestionDataProvider &&
      !this.searchFieldConfig.disableAutocomplete
    ) {
      this.filteredSuggestions$ = this.searchControl.valueChanges.pipe(
        debounceTime(300),
        tap((keyword) => this.closePanelIfEmpty(keyword)),
        tap((keyword) => (this.defaultValueForDropDownMode = keyword)),
        tap((keyword) => this.emitInputEvent(keyword)),
        tap(() => (this.isLoading = true)),
        switchMap((keyword) => {
          return this.searchFieldConfig.asyncSuggestionDataProvider
            ? this.searchFieldConfig
                .asyncSuggestionDataProvider({
                  keyword,
                  numberOfSuggestions: this.numberOfSuggestions,
                })
                .pipe(finalize(() => (this.isLoading = false)))
            : of([]);
        })
      );
    }

    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.Mobile, Breakpoints.Tablet])
      .subscribe((result) => {
        this.isMobile = result.breakpoints[Breakpoints.Mobile];
        this.isTablet = result.breakpoints[Breakpoints.Tablet];
      });
  }

  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
  }

  startSearch(): void {
    const searchKeyword = this.searchControl.value || '';
    if (this.searchFieldConfig.addQueryToURLParams) {
      resetToQueryParam(this.searchQueryParamKey, searchKeyword);
    }
    this.searchEvent.emit(searchKeyword);
  }

  startSearchWithEnter($event: any): void {
    $event.target.blur();
    this.autocomplete.closePanel();
    this.startSearch();
  }
  startSearchWithOptionClick($event: any): void {
    if ($event.target.tagName !== 'MAT-ICON') {
      this.autocomplete.closePanel();
      this.startSearch();
    } else {
      $event.preventDefault();
    }
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  getFormattedOption(option: string): string {
    const indexFound = option
      .toLowerCase()
      .indexOf(this.searchControl.value?.toLowerCase());
    if (this.searchControl.value && indexFound >= 0) {
      return `<strong>${option.substring(
        0,
        indexFound
      )}</strong>${option.substring(
        indexFound,
        indexFound + this.searchControl.value.length
      )}<strong>${option.substring(
        indexFound + this.searchControl.value.length,
        option.length
      )}</strong>`;
    }
    return option;
  }

  onOptionActivated($event: any): void {
    if ($event.option) {
      if ($event.option.id === this.numberOfSuggestions) {
        this.searchControl.setValue(this.defaultValueForDropDownMode, {
          emitEvent: false,
        });
      } else {
        this.searchControl.setValue($event.option.value, { emitEvent: false });
      }
    }
  }

  setOptionAsSearchValue(option: string): void {
    this.searchControl.setValue(option);
  }

  clearSearchValue(): void {
    this.searchControl.setValue('');
  }

  private emitInputEvent(keyword: string): void {
    this.inputEvent.emit({
      keyword,
      numberOfSuggestions: this.numberOfSuggestions,
    });
  }

  private closePanelIfEmpty(keyword: string): void {
    if (keyword === '') {
      this.autocomplete.closePanel();
    }
  }

  private checkValueInput(value: string | undefined): void {
    if (value) {
      this.searchControl.setValue(this.searchFieldConfig.value);
      if (this.searchFieldConfig.addQueryToURLParams) {
        resetToQueryParam(this.searchQueryParamKey, value);
      }
    }
  }
}

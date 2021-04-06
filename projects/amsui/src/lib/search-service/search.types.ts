import { Observable } from 'rxjs';
import { MatFormFieldAppearance } from '@angular/material/form-field';

export interface NamedIcon {
  icon: string;
  name: string;
  description?: string;
}
export interface ResultEntry {
  title: string;
  description: string;
  id?: string;
  avatarImgSrc?: string;
  avatarIcon?: string;
  subTitles?: NamedIcon[];
  tags?: string[];
  imageSrc?: string;
  actions?: NamedIcon[];
  avatarToolTip?: string;
}
export interface ResultEntryActionEvent {
  actionName: string;
  entry: ResultEntry;
}
export type ResultViewType = 'grid' | 'list';
export interface SearchResultMeta {
  numFound: number;
  timeTaken: number;
  keyword: string;
  numShowed: number;
  didYouMeanValue?: string;
}
export type FacetType = 'single' | 'multi';
export interface Facet {
  name: string;
  screenName: string;
  entries: FacetEntry[];
  options: FacetOptions;
}
export interface FacetOptions {
  facetType?: FacetType;
  enableSearch?: boolean;
  icon?: string;
  showMoreBehaviour?: boolean;
  showMoreThreshold?: number;
  collapsed?: boolean;
  hideNumbers?: boolean;
  showMoreOpened?: boolean;
  [key: string]: boolean | number | FacetType | string | undefined;
}
export interface FacetEntry {
  name: string;
  numberOfResults: number;
  viewName: string;
  selected?: boolean;
}
export interface SelectedFacet {
  facetName: string;
  facetEntryName: string;
}
export interface SortingOption {
  value: string;
  viewValue: string;
  default?: boolean;
  fieldOfResults?: string;
}
export interface SuggestionParameter {
  keyword: string;
  numberOfSuggestions: number;
}

export interface DefaultConfig {
  searchFieldConfig: SearchFieldConfig;
  searchResultMeta: SearchResultMeta;
  facetOptions: FacetOptions;
  highlightingActivated: boolean;
  numberOfSuggestions: number;
  showMoreWordLimit: number;
  resultViewConfig: ResultViewConfig;
  noResultsConfig: NoResultsConfig;
  metaViewConfig: MetaResultViewConfig;
}

export interface VisualFacetState {
  facetName: string;
  showMoreOpened: boolean;
  collapsed: boolean;
}
export interface SearchFieldConfig {
  value?: string;
  formFieldAppearance?: MatFormFieldAppearance;
  addQueryToURLParams?: boolean;
  disableAutocomplete?: boolean;
  asyncSuggestionDataProvider?: (
    input: SuggestionParameter
  ) => Observable<string[]>;
}

export interface FilterTab {
  name: string;
  viewName: string;
  icon: string;
}

export interface NoResultsConfig {
  searchKeyword: string;
  didYouMeanValue: string;
  alternativeKeywords: string[];
  alternativeResults: ResultEntry[];
  contactMailAddress?: string;
  contactPhoneNumber?: string;
}

export interface MetaResultViewConfig {
  sortingOptions?: SortingOption[];
  resultViewTypes?: ResultViewType[];
  selectedResultViewType?: ResultViewType;
}
export interface ResultViewConfig extends MetaResultViewConfig {
  filterTabs?: FilterTab[];
}

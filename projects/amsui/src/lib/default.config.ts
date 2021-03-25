import {
  DefaultConfig,
  MetaResultViewConfig,
} from './search-service/search.types';

const defaultViewConfig: MetaResultViewConfig = {
  sortingOptions: [],
  resultViewTypes: ['list', 'grid'],
  selectedResultViewType: 'list',
};

export const defaultConfig: DefaultConfig = {
  highlightingActivated: true,
  numberOfSuggestions: 6,
  showMoreWordLimit: 100,
  searchResultMeta: {
    numFound: -1,
    numShowed: -1,
    keyword: '',
    timeTaken: -1,
  },
  facetOptions: {
    enableSearch: false,
    showMoreBehaviour: true,
    showMoreThreshold: 5,
    collapsed: false,
    facetType: 'single',
    icon: '',
    hideNumbers: false,
  },
  searchFieldConfig: {
    placeholderLabel: 'searchField.placeholderLabel',
    searchButtonText: 'searchField.searchButtonText',
    value: '',
    addQueryToURLParams: true,
    disableAutocomplete: false,
    formFieldAppearance: 'standard',
  },
  metaViewConfig: defaultViewConfig,
  resultViewConfig: {
    ...defaultViewConfig,
    filterTabs: [],
    searchResultPlaceholderText: 'searchResultsWrapper.placeholder',
  },
  noResultsConfig: {
    alternativeKeywords: [],
    alternativeResults: [],
    didYouMeanValue: '',
    searchKeyword: '',
  },
};

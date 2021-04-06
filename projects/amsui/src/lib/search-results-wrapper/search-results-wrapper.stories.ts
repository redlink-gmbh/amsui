import { Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ResultViewConfig,
  ResultViewType,
  SearchResultMeta,
} from '../search-service/search.types';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { SearchResultMetaModule } from '../search-result-meta/search-result-meta.module';
import { NoResultsModule } from '../no-results/no-results.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResultsModule } from '../results/results.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SearchResultsWrapperComponent } from './search-results-wrapper.component';
import { TranslationSettingsModule } from '../translation-settings.module';
import { getNoResultConfig } from '../no-results/no-results.stories';
import { getResults } from '../results/results.stories';

export const SearchResultsWrapperModuleImports = moduleMetadata({
  declarations: [SearchResultsWrapperComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    SearchResultMetaModule,
    NoResultsModule,
    MatProgressSpinnerModule,
    ResultsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    TranslationSettingsModule,
  ],
});

export const Template: Story<SearchResultsWrapperComponent> = (
  args: SearchResultsWrapperComponent
) => ({
  component: SearchResultsWrapperComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  searchResultsWrapperText: {
    placeholder:
      'You can start the search by easily adding something to the search field and hitting the enter key!',
  },
};

export const AddConfigs = Template.bind({});
AddConfigs.args = {
  searchResultMeta: getSearchResultMeta(1),
  resultViewConfig: getResultViewConfig(0),
  noResultsConfig: getNoResultConfig(0),
  searchResults: getResults(),
};
export const NoResults = Template.bind({});
NoResults.args = {
  searchResultMeta: getSearchResultMeta(1),
  resultViewConfig: getResultViewConfig(0),
  noResultsConfig: getNoResultConfig(3),
  searchResults: [],
};
export const AddSortingAndViewChange = Template.bind({});
AddSortingAndViewChange.args = {
  searchResultMeta: getSearchResultMeta(0),
  resultViewConfig: getResultViewConfig(1),
  noResultsConfig: getNoResultConfig(3),
  searchResults: getResults(),
};
export const AddFilterTabs = Template.bind({});
AddFilterTabs.args = {
  searchResultMeta: getSearchResultMeta(0),
  resultViewConfig: getResultViewConfig(2),
  noResultsConfig: getNoResultConfig(3),
  searchResults: getResults(),
};
export const ChangeText = Template.bind({});
ChangeText.args = {
  searchResultMeta: getSearchResultMeta(0),
  resultViewConfig: getResultViewConfig(2),
  noResultsConfig: getNoResultConfig(3),
  searchResults: getResults(),
  searchResultsWrapperText: {
    loadMoreButton: 'Do you want to load more?',
    problemsLoadMore: 'Problems occurred! Please load again!',
  },
};

function getSearchResultMeta(index: number): SearchResultMeta {
  const searchResultMeta: SearchResultMeta = {
    numFound: 100,
    timeTaken: 520,
    keyword: 'Dog',
    numShowed: 20,
  };
  return [
    searchResultMeta,
    {
      ...searchResultMeta,
      didYouMeanValue: 'Cat',
    },
  ][index];
}

function getResultViewConfig(index: number): ResultViewConfig {
  const resultViewConfig: ResultViewConfig = {
    sortingOptions: [],
    resultViewTypes: ['grid'],
    selectedResultViewType: 'grid',
    filterTabs: [],
  };
  return [
    resultViewConfig,
    {
      ...resultViewConfig,
      sortingOptions: [
        { viewValue: 'Title', value: 'title' },
        { viewValue: 'Relevance', value: 'relevance' },
      ],
      resultViewTypes: ['grid', 'list'] as ResultViewType[],
      selectedResultViewType: 'list' as ResultViewType,
    },
    {
      ...resultViewConfig,
      resultViewTypes: ['grid', 'list'] as ResultViewType[],
      selectedResultViewType: 'list' as ResultViewType,
      filterTabs: [
        { name: 'all', icon: 'search', viewName: 'All' },
        { name: 'documents', icon: 'article', viewName: 'Documents' },
        { name: 'events', icon: 'event', viewName: 'Events' },
      ],
    },
  ][index];
}

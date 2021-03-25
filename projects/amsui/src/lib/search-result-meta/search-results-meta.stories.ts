import { Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SearchResultMetaComponent } from './search-result-meta.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { DidYouMeanModule } from './did-you-mean/did-you-mean.module';
import { TranslationSettingsModule } from '../translation-settings.module';
import { SearchResultTextComponent } from './search-result-text/search-result-text.component';
import { SortingSelectComponent } from './sorting-select/sorting-select.component';
import { ResultTypeComponent } from './result-type/result-type.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MetaResultViewConfig,
  ResultViewType,
  SearchResultMeta,
} from '../search-service/search.types';

export const SearchResultMetaModuleImports = moduleMetadata({
  declarations: [
    SearchResultMetaComponent,
    SearchResultTextComponent,
    SortingSelectComponent,
    ResultTypeComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSelectModule,
    DidYouMeanModule,
    BrowserAnimationsModule,
    TranslationSettingsModule,
  ],
});

export const Template: Story<SearchResultMetaComponent> = (
  args: SearchResultMetaComponent
) => ({
  component: SearchResultMetaComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};

export const SetTextMetaInformation = Template.bind({});
SetTextMetaInformation.args = getMetaConfig(0);

export const DidYouMean = Template.bind({});
DidYouMean.args = getMetaConfig(1);

export const ChangeableViewType = Template.bind({});
ChangeableViewType.args = getMetaConfig(3);

export const SortingOptions = Template.bind({});
SortingOptions.args = getMetaConfig(2);

export const AllFeatures = Template.bind({});
AllFeatures.args = getMetaConfig(4);

function getMetaConfig(
  index: number
): {
  searchResultMeta: SearchResultMeta;
  metaResultViewConfig: MetaResultViewConfig;
} {
  const searchResultMeta: SearchResultMeta = {
    numFound: 100,
    timeTaken: 520,
    keyword: 'Dog',
    numShowed: 20,
  };
  const metaResultViewConfig: MetaResultViewConfig = {};
  const sortingOptions = [
    { viewValue: 'Title', value: 'title' },
    { viewValue: 'Relevance', value: 'relevance' },
  ];
  return [
    { searchResultMeta, metaResultViewConfig },
    {
      searchResultMeta: {
        ...searchResultMeta,
        didYouMeanValue: 'Cat',
      },
      metaResultViewConfig,
    },
    {
      searchResultMeta,
      metaResultViewConfig: {
        ...metaResultViewConfig,
        sortingOptions,
      },
    },
    {
      searchResultMeta,
      metaResultViewConfig: {
        ...metaResultViewConfig,
        resultViewTypes: ['list', 'grid'] as ResultViewType[],
        selectedResultViewType: 'grid' as ResultViewType,
      },
    },
    {
      searchResultMeta: {
        ...searchResultMeta,
        didYouMeanValue: 'Cat',
      },
      metaResultViewConfig: {
        sortingOptions,
        resultViewTypes: ['list', 'grid'] as ResultViewType[],
        selectedResultViewType: 'grid' as ResultViewType,
      },
    },
  ][index];
}

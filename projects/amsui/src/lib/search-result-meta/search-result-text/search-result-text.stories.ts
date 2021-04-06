import { Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TranslationSettingsModule } from '../../translation-settings.module';
import { SearchResultTextComponent } from './search-result-text.component';
import { DidYouMeanModule } from '../did-you-mean/did-you-mean.module';

export const SearchResultTextModuleImports = moduleMetadata({
  declarations: [SearchResultTextComponent],
  imports: [CommonModule, DidYouMeanModule, TranslationSettingsModule],
});

export const Template: Story<SearchResultTextComponent> = (
  args: SearchResultTextComponent
) => ({
  component: SearchResultTextComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = { searchResultMeta: getSearchResultMeta(0) };

export const DidYouMeanValue = Template.bind({});
DidYouMeanValue.args = {
  searchResultMeta: getSearchResultMeta(1),
};
export const ChangeText = Template.bind({});
ChangeText.args = {
  searchResultMeta: getSearchResultMeta(1),
  text: { information: 'We found 80 entries for Dogs in our Database!' },
};

export const ChangeTextNotFound = Template.bind({});
ChangeTextNotFound.args = {
  searchResultMeta: getSearchResultMeta(2),
  text: { notFound: 'We have not found anything on our side!' },
};

function getSearchResultMeta(index: number): any {
  const searchResultMeta = {
    numFound: 100,
    timeTaken: 520,
    keyword: 'Dog',
    numShowed: 20,
  };
  return [
    searchResultMeta,
    { ...searchResultMeta, didYouMeanValue: 'Cat' },
    { ...searchResultMeta, numFound: 0 },
  ][index];
}

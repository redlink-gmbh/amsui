import { Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TranslationSettingsModule } from '../translation-settings.module';
import { ResultsModule } from '../results/results.module';
import { NoResultsComponent } from './no-results.component';
import { DidYouMeanModule } from '../search-result-meta/did-you-mean/did-you-mean.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoResultsConfig } from '../search-service/search.types';

export function getNoResultConfig(index: number): NoResultsConfig {
  const defaultConfig: NoResultsConfig = {
    alternativeKeywords: [],
    alternativeResults: [],
    searchKeyword: '',
    didYouMeanValue: '',
  };
  return [
    {
      ...defaultConfig,
      contactMailAddress: 'office@redlink.at',
      contactPhoneNumber: '+43 662 27 66 80',
    },
    {
      ...defaultConfig,
      searchKeyword: 'Dog ped tox',
      didYouMeanValue: 'Dog pet toy',
      alternativeKeywords: ['Dog', 'Cat', 'Guinea pig', 'Horse', 'Pet', 'Toy'],
    },
    {
      ...defaultConfig,
      alternativeResults: [
        { title: 'Dog', description: 'This result entry is all about dogs' },
        { title: 'Cat', description: 'This result entry is all about cats' },
      ],
    },
    {
      alternativeKeywords: ['Dog', 'Cat', 'Guinea pig', 'Horse'],
      alternativeResults: [
        { title: 'Dog', description: 'This result entry is all about dogs' },
        { title: 'Cat', description: 'This result entry is all about cats' },
      ],
      contactMailAddress: 'office@redlink.at',
      contactPhoneNumber: '+43 662 27 66 80',
      searchKeyword: 'Dog ped tox',
      didYouMeanValue: 'Dog pet toy',
    },
  ][index];
}

export const NoResultsModuleImports = moduleMetadata({
  declarations: [NoResultsComponent],
  imports: [
    CommonModule,
    ResultsModule,
    DidYouMeanModule,
    TranslationSettingsModule,
    MatButtonModule,
    MatIconModule,
  ],
});

export const Template: Story<NoResultsComponent> = (
  args: NoResultsComponent
) => ({
  component: NoResultsComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};

export const ContactInformation = Template.bind({});
ContactInformation.args = {
  config: getNoResultConfig(0),
};

export const KeywordHandling = Template.bind({});
KeywordHandling.args = {
  config: getNoResultConfig(1),
};

export const AlternativeResults = Template.bind({});
AlternativeResults.args = {
  config: getNoResultConfig(2),
};

export const AllFeatures = Template.bind({});
AllFeatures.args = {
  config: getNoResultConfig(3),
};

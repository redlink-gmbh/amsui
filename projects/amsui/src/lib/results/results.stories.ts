import { Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TranslationSettingsModule } from '../translation-settings.module';
import { ResultEntry } from '../search-service/search.types';
import { ResultsComponent } from './results.component';
import { ResultEntryModule } from './result-entry/result-entry.module';

export function getResults(): ResultEntry[] {
  const numberOfResults = 30;
  const results: ResultEntry[] = [];
  for (let i = 1; i < numberOfResults; i++) {
    results.push({
      title: `Title ${i}`,
      description: `Description of the result ${i}. This could be <em>highlighted</em>.`,
    });
  }
  return results;
}

export const ResultsModuleImports = moduleMetadata({
  declarations: [ResultsComponent],
  imports: [CommonModule, TranslationSettingsModule, ResultEntryModule],
});

const Template: Story<ResultsComponent> = (args: ResultsComponent) => ({
  component: ResultsComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  results: getResults(),
};

export const DeactivateHighlighting = Template.bind({});
DeactivateHighlighting.args = {
  results: getResults(),
  highlightingActivated: false,
};

export const ChangeResultType = Template.bind({});
ChangeResultType.args = {
  results: getResults(),
  resultType: 'grid',
};

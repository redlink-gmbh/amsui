import { Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { SortingSelectComponent } from './sorting-select.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TranslationSettingsModule } from '../../translation-settings.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const SortingSelectModuleImports = moduleMetadata({
  declarations: [SortingSelectComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    TranslationSettingsModule,
  ],
});

export const Template: Story<SortingSelectComponent> = (
  args: SortingSelectComponent
) => ({
  component: SortingSelectComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = getSortingSelectInputs(0);

export const SetDefaultSortingOption = Template.bind({});
SetDefaultSortingOption.args = getSortingSelectInputs(1);

export const Disabled = Template.bind({});
Disabled.args = getSortingSelectInputs(2);

export const ChangedFormFieldAppearance = Template.bind({});
ChangedFormFieldAppearance.args = getSortingSelectInputs(3);

function getSortingSelectInputs(index: number): any {
  const sortingOptions = [
    { viewValue: 'Title', value: 'title' },
    { viewValue: 'Relevance', value: 'relevance' },
  ];
  return [
    { sortingOptions },
    { sortingOptions, defaultSortOption: 'relevance' },
    { sortingOptions, disabled: true },
    { sortingOptions, formFieldAppearance: 'outline' },
  ][index];
}

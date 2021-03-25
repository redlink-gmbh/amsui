import { Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TranslationSettingsModule } from '../../translation-settings.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { ResultTypeComponent } from './result-type.component';
import { ResultViewType } from '../../search-service/search.types';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const ResultTypeModuleImports = moduleMetadata({
  declarations: [ResultTypeComponent],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatIconModule,
    TranslationSettingsModule,
    BrowserAnimationsModule,
  ],
});

export const Template: Story<ResultTypeComponent> = (
  args: ResultTypeComponent
) => ({
  component: ResultTypeComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = getResultTypeConfig(0);

export const SelectedType = Template.bind({});
SelectedType.args = getResultTypeConfig(1);

export const Disabled = Template.bind({});
Disabled.args = getResultTypeConfig(2);

function getResultTypeConfig(index: number): any {
  const disabled = true;
  const resultTypes: ResultViewType[] = ['list', 'grid'];
  return [
    { resultTypes },
    { resultTypes, selectedResultType: 'grid' },
    { resultTypes, disabled },
  ][index];
}

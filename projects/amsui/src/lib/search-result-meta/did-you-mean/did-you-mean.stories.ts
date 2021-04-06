import { Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TranslationSettingsModule } from '../../translation-settings.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DidYouMeanComponent } from './did-you-mean.component';

export const DidYouMeanModuleImports = moduleMetadata({
  declarations: [DidYouMeanComponent],
  imports: [CommonModule, TranslationSettingsModule, BrowserAnimationsModule],
});

export const Template: Story<DidYouMeanComponent> = (
  args: DidYouMeanComponent
) => ({
  component: DidYouMeanComponent,
  props: args,
});

export const AddValue = Template.bind({});
AddValue.args = { value: 'Cat' };
export const ChangeText = Template.bind({});
ChangeText.args = { value: 'Dog', didYouMeanText: 'Did you really mean ' };

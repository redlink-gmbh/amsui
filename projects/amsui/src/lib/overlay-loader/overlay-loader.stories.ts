import { Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayLoaderComponent } from './overlay-loader.component';

export const OverlayLoaderModuleImports = moduleMetadata({
  declarations: [OverlayLoaderComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
});

const Template: Story<OverlayLoaderComponent> = (
  args: OverlayLoaderComponent
) => ({
  component: OverlayLoaderComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};

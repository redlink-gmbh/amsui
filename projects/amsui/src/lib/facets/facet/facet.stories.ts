import { Story } from '@storybook/angular/types-6-0';
import { FacetComponent } from './facet.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { TranslationSettingsModule } from '../../translation-settings.module';
import { Facet, FacetType } from '../../search-service/search.types';

export const FacetModuleImports = moduleMetadata({
  declarations: [FacetComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    BrowserAnimationsModule,
    TranslationSettingsModule,
  ],
});

export const Template: Story<FacetComponent> = (args: FacetComponent) => ({
  component: FacetComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  inputFacet: getFacet(0),
};
export const ShowMoreThreshold = Template.bind({});
ShowMoreThreshold.args = {
  inputFacet: getFacet(1),
};
export const NoShowMore = Template.bind({});
NoShowMore.args = {
  inputFacet: getFacet(2),
};
export const Search = Template.bind({});
Search.args = {
  inputFacet: getFacet(3),
};
export const Icon = Template.bind({});
Icon.args = {
  inputFacet: getFacet(4),
};
export const Collapsed = Template.bind({});
Collapsed.args = {
  inputFacet: getFacet(5),
};
export const MultiSelect = Template.bind({});
MultiSelect.args = {
  inputFacet: getFacet(6),
};

function getFacet(index: number): Facet {
  const entries = [
    { name: 'Berlin', viewName: 'Berlin', numberOfResults: 10 },
    { name: 'Leipzig', viewName: 'Leipzig', numberOfResults: 7 },
    { name: 'Stuttgart', viewName: 'Stuttgart', numberOfResults: 8 },
    { name: 'München', viewName: 'München', numberOfResults: 4 },
    { name: 'Köln', viewName: 'Köln', numberOfResults: 3 },
    { name: 'Dortmund', viewName: 'Dortmund', numberOfResults: 3 },
    { name: 'Düsseldorf', viewName: 'Düsseldorf', numberOfResults: 2 },
  ];
  const name = 'places';
  const screenName = 'Orte';
  return [
    {
      name,
      screenName,
      entries,
      options: {},
    },
    {
      name,
      screenName,
      entries,
      options: {
        showMoreThreshold: 4,
      },
    },
    {
      name,
      screenName,
      entries,
      options: {
        showMoreBehaviour: false,
      },
    },
    {
      name,
      screenName,
      entries,
      options: {
        enableSearch: true,
      },
    },
    {
      name,
      screenName,
      entries,
      options: {
        icon: 'room',
      },
    },
    {
      name,
      screenName,
      entries,
      options: {
        collapsed: true,
      },
    },
    {
      name,
      screenName,
      entries,
      options: {
        facetType: 'multi' as FacetType,
      },
    },
  ][index];
}

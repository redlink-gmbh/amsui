import { Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslationSettingsModule } from '../translation-settings.module';
import { FacetGroupComponent } from './facet-group.component';
import { Facet } from '../search-service/search.types';
import { FacetModule } from './facet/facet.module';
import { TranslateModule } from '@ngx-translate/core';

export const FacetGroupModuleImports = moduleMetadata({
  declarations: [FacetGroupComponent],
  imports: [
    CommonModule,
    FacetModule,
    TranslateModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    TranslationSettingsModule,
  ],
});

const Template: Story<FacetGroupComponent> = (args: FacetGroupComponent) => ({
  component: FacetGroupComponent,
  props: args,
});

export const MultipleFacets = Template.bind({});
MultipleFacets.args = {
  facets: getFacets(),
};

export const ChangeText = Template.bind({});
ChangeText.args = {
  facets: getFacets(),
  facetGroupText: {
    noPossibleFilters: 'No filters can be applied',
    openAllFacets: 'Open filters',
    closeAllFacets: 'Close filters',
    resetFacetSelection: 'Reset',
    filterResults: 'Available filters',
  },
};
function getFacets(): Facet[] {
  return [
    {
      name: 'external',
      screenName: 'Interner/Externer Mitarbeiter',
      entries: [
        {
          name: 'false',
          viewName: 'Interner Mitarbeiter',
          numberOfResults: 1023,
        },
        {
          name: 'true',
          viewName: 'Externer Mitarbeiter',
          numberOfResults: 12,
        },
      ],
      options: {
        icon: 'add',
      },
    },
    {
      name: 'roles',
      screenName: 'Rolle der Mitarbeiter',
      entries: [
        {
          name: 'Führungskraft',
          viewName: 'Führungskraft',
          numberOfResults: 10,
        },
        {
          name: 'Agility Master',
          viewName: 'Agility Master',
          numberOfResults: 4,
        },
        {
          name: 'Product Owner',
          viewName: 'Interner Mitarbeiter',
          numberOfResults: 3,
        },
        {
          name: 'Tester',
          viewName: 'Tester',
          numberOfResults: 4,
        },
        {
          name: 'Developer',
          viewName: 'Developer',
          numberOfResults: 1,
        },
        {
          name: 'Frontend Developer',
          viewName: 'Frontend Developer',
          numberOfResults: 4,
        },
      ],
      options: {
        icon: 'home',
        facetType: 'multi',
      },
    },
    {
      name: 'places',
      screenName: 'Orte',
      entries: [
        { name: 'Berlin', viewName: 'Berlin', numberOfResults: 10 },
        { name: 'Stuttgart', viewName: 'Stuttgart', numberOfResults: 8 },
        { name: 'Leipzig', viewName: 'Leipzig', numberOfResults: 7 },
        { name: 'München', viewName: 'München', numberOfResults: 4 },
        { name: 'Köln', viewName: 'Köln', numberOfResults: 3 },
        { name: 'Dortmund', viewName: 'Dortmund', numberOfResults: 3 },
        { name: 'Düsseldorf', viewName: 'Düsseldorf', numberOfResults: 2 },
      ],
      options: {
        enableSearch: true,
      },
    },
  ];
}

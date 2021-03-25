import { Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslationSettingsModule } from '../translation-settings.module';
import { SearchFieldComponent } from './search-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuggestionParameter } from '../search-service/search.types';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const SearchFieldModuleImports = moduleMetadata({
  declarations: [SearchFieldComponent],
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    TranslationSettingsModule,
    BrowserAnimationsModule,
  ],
});

const Template: Story<SearchFieldComponent> = (args: SearchFieldComponent) => ({
  component: SearchFieldComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  config: {},
};
export const ChangeText = Template.bind({});
ChangeText.args = {
  config: {
    placeholderLabel: 'Here you can adjust the placeholder',
    searchButtonText: 'and the button text',
  },
};
export const SetValue = Template.bind({});
SetValue.args = {
  config: {
    value: 'Value can also be set',
  },
};
export const ChangeMaterialAppearance = Template.bind({});
ChangeMaterialAppearance.args = {
  config: {
    formFieldAppearance: 'fill',
  },
};
export const EnableURLQueryParams = Template.bind({});
EnableURLQueryParams.args = {
  config: {
    addQueryToURLParams: true,
  },
};
export const AutocompleteSuggestions = Template.bind({});
AutocompleteSuggestions.args = {
  config: {
    disableAutocomplete: false,
    asyncSuggestionDataProvider: fakeSearchSuggestions.bind(this),
  },
};
function fakeSearchSuggestions(
  input: SuggestionParameter
): Observable<string[]> {
  const filteredSuggestions = [
    'Knowledge',
    'Knowledge management',
    'Knowledge officer',
    'My knowledge',
    'Your knowledge',
    'Knowledge transfer',
    'Your knowledge',
    'Natural Language Processing',
    'NLP',
    'Management',
  ]
    .filter((option) =>
      option.toLowerCase().includes(input.keyword.toLowerCase())
    )
    .slice(0, input.numberOfSuggestions);
  return of(filteredSuggestions).pipe(delay(300));
}

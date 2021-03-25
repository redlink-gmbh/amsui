import { Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SuggestionParameter, SearchFieldConfig } from '@redlink/amsui';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(CdkOverlayOrigin) origin!: CdkOverlayOrigin;
  title = 'Angular Material Search UI - AMSUI';
  searchKeyword = '';
  searchFieldConfig: SearchFieldConfig = {
    placeholderLabel: 'app.searchField.placeholderLabel',
    asyncSuggestionDataProvider: this.fakeSearchSuggestions.bind(this),
  };

  constructor(private readonly translateService: TranslateService) {
    this.translateService.setDefaultLang('de');
    this.translateService.use('en');
  }

  handleSearchEvent(searchKeyword: string): void {
    this.searchKeyword = searchKeyword;
    alert('You searched for ' + searchKeyword);
  }
  fakeSearchSuggestions(input: SuggestionParameter): Observable<string[]> {
    const filteredSuggestions = [
      'Knowledge',
      'Knowledge management',
      'Knowledge officer',
      'My knowledge',
      'Your knowledge',
      'Your knowledge',
      'Natural Language Processing',
      'NLP',
      'Management',
      'Solr',
      'Amsui',
    ]
      .filter((option) =>
        option.toLowerCase().includes(input.keyword.toLowerCase())
      )
      .slice(0, input.numberOfSuggestions);
    return of(filteredSuggestions).pipe(delay(300));
  }
}

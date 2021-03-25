import { NgModule } from '@angular/core';
import { SearchResultsWrapperComponent } from './search-results-wrapper.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SearchResultMetaModule } from '../search-result-meta/search-result-meta.module';
import { NoResultsModule } from '../no-results/no-results.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResultsModule } from '../results/results.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [SearchResultsWrapperComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    SearchResultMetaModule,
    NoResultsModule,
    MatProgressSpinnerModule,
    ResultsModule,
    TranslateModule,
    MatTabsModule,
  ],
  exports: [SearchResultsWrapperComponent],
})
export class SearchResultsWrapperModule {}

import { NgModule } from '@angular/core';
import { SearchResultMetaComponent } from './search-result-meta.component';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { DidYouMeanModule } from './did-you-mean/did-you-mean.module';
import { TranslateModule } from '@ngx-translate/core';
import { ResultTypeModule } from './result-type/result-type.module';
import { SortingSelectModule } from './sorting-select/sorting-select.module';
import { SearchResultTextModule } from './search-result-text/search-result-text.module';

@NgModule({
  declarations: [SearchResultMetaComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    DidYouMeanModule,
    ResultTypeModule,
    SortingSelectModule,
    SearchResultTextModule,
    TranslateModule,
  ],
  exports: [SearchResultMetaComponent],
})
export class SearchResultMetaModule {}

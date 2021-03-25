import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SearchResultTextComponent } from './search-result-text.component';
import { DidYouMeanModule } from '../did-you-mean/did-you-mean.module';

@NgModule({
  declarations: [SearchResultTextComponent],
  imports: [CommonModule, TranslateModule, DidYouMeanModule],
  exports: [SearchResultTextComponent],
})
export class SearchResultTextModule {}

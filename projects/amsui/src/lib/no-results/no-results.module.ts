import { NgModule } from '@angular/core';
import { NoResultsComponent } from './no-results.component';
import { CommonModule } from '@angular/common';
import { ResultsModule } from '../results/results.module';
import { DidYouMeanModule } from '../search-result-meta/did-you-mean/did-you-mean.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NoResultsComponent],
  imports: [
    CommonModule,
    ResultsModule,
    DidYouMeanModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [NoResultsComponent],
})
export class NoResultsModule {}

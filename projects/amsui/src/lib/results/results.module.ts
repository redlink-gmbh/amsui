import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { TranslateModule } from '@ngx-translate/core';
import { ResultEntryModule } from './result-entry/result-entry.module';

@NgModule({
  declarations: [ResultsComponent],
  imports: [CommonModule, TranslateModule, ResultEntryModule],
  exports: [ResultsComponent],
})
export class ResultsModule {}

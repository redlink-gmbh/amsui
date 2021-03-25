import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DidYouMeanComponent } from './did-you-mean.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DidYouMeanComponent],
  imports: [CommonModule, TranslateModule],
  exports: [DidYouMeanComponent],
})
export class DidYouMeanModule {}

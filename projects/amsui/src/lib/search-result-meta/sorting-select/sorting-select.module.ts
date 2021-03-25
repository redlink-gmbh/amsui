import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SortingSelectComponent } from './sorting-select.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [SortingSelectComponent],
  imports: [CommonModule, TranslateModule, MatSelectModule],
  exports: [SortingSelectComponent],
})
export class SortingSelectModule {}

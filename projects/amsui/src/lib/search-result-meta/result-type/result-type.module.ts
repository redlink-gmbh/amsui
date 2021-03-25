import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ResultTypeComponent } from './result-type.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ResultTypeComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatIconModule,
  ],
  exports: [ResultTypeComponent],
})
export class ResultTypeModule {}

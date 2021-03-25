import { NgModule } from '@angular/core';
import { FacetGroupComponent } from './facet-group.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FacetModule } from './facet/facet.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [FacetGroupComponent],
  imports: [
    CommonModule,
    FacetModule,
    TranslateModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
  ],
  exports: [FacetGroupComponent],
})
export class FacetGroupModule {}

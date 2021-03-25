import { NgModule } from '@angular/core';
import { FacetGroupModule } from './facets/facet-group.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { SearchFieldModule } from './search-field/search-field.module';
import { SearchResultsWrapperModule } from './search-results-wrapper/search-results-wrapper.module';

@NgModule({
  declarations: [],
  imports: [
    FacetGroupModule,
    OverlayModule,
    SearchFieldModule,
    SearchResultsWrapperModule,
  ],
})
export class AmsuiModule {}

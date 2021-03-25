import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import {
  Facet,
  SelectedFacet,
  VisualFacetState,
} from '../search-service/search.types';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'amsui-facet-group',
  templateUrl: './facet-group.component.html',
  styleUrls: ['./facet-group.component.scss'],
})
export class FacetGroupComponent implements OnChanges {
  @Input() facets: Facet[] = [];
  @Output() facetSelectedEvent = new EventEmitter<SelectedFacet>();
  @Output() resetFacetsEvent = new EventEmitter<void>();
  @Output() unselectOneFacet = new EventEmitter<string>();
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  selectedFacets: SelectedFacet[] = [];
  visualStateFacets: VisualFacetState[] = [];
  openPanels = false;

  constructor(private readonly translateService: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.facets && !this.checkIfAnyFacetIsSelected()) {
      this.selectedFacets = [];
      this.visualStateFacets = [];
    }
  }

  checkIfAnyFacetIsSelected(): boolean {
    return (
      this.facets.filter((facet) => {
        return facet.entries.some((facetEntry) => facetEntry.selected);
      }).length > 0
    );
  }

  facetSelected(selectedFacet: SelectedFacet): void {
    const indexOfFacet = this.selectedFacets.findIndex(
      (facet) =>
        facet.facetEntryName === selectedFacet.facetEntryName &&
        facet.facetName === selectedFacet.facetName
    );
    if (indexOfFacet >= 0) {
      this.selectedFacets.splice(indexOfFacet, 1);
    } else {
      this.selectedFacets.push(selectedFacet);
    }
    this.facetSelectedEvent.emit(selectedFacet);
  }

  resetFacets(): void {
    this.openPanels = false;
    this.selectedFacets = [];
    this.resetFacetsEvent.emit();
    this.visualStateFacets = [];
    this.facets = this.facets.map((facet) => ({
      ...facet,
      entries: facet.entries.map((facetEntry) => ({
        ...facetEntry,
        selected: false,
      })),
    }));
  }

  unselectAllForOneFacet(facetName: string): void {
    this.unselectOneFacet.emit(facetName);
  }

  toggleUnfoldButton(): void {
    this.openPanels ? this.accordion.openAll() : this.accordion.closeAll();
    this.openPanels = !this.openPanels;
  }

  getToolTipUnfoldButton(): string {
    let transKey = 'facets.closeAllFacets';
    if (this.openPanels) {
      transKey = 'facets.openAllFacets';
    }
    return this.translateService.instant(transKey);
  }

  saveVisualState(visualFacetState: VisualFacetState): void {
    const indexOfFacet = this.visualStateFacets.findIndex(
      (facet) => facet.facetName === visualFacetState.facetName
    );
    if (indexOfFacet >= 0) {
      this.visualStateFacets[indexOfFacet] = visualFacetState;
    } else {
      this.visualStateFacets.push(visualFacetState);
    }
  }
  getFacetAndVisualAdaptions(facet: Facet): Facet {
    const indexOfFacet = this.visualStateFacets.findIndex(
      (facetVisual) => facetVisual.facetName === facet.name
    );
    if (indexOfFacet >= 0) {
      facet.options.showMoreOpened = this.visualStateFacets[
        indexOfFacet
      ].showMoreOpened;
      facet.options.collapsed = this.visualStateFacets[indexOfFacet].collapsed;
    }
    return facet;
  }
}

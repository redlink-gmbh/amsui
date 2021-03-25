import { Component, EventEmitter, Input, Output } from '@angular/core';
import type {
  Facet,
  FacetEntry,
  FacetOptions,
  SelectedFacet,
  VisualFacetState,
} from '../../search-service/search.types';
import { defaultConfig } from '../../default.config';
import { handleFacetQueryParam } from '../../search-params.util';

@Component({
  selector: 'amsui-facet',
  templateUrl: './facet.component.html',
  styleUrls: ['./facet.component.scss'],
})
export class FacetComponent {
  /**
   * Let you decide if the search query is inserted into the URL params
   */
  @Input() addToURLParams = true;
  @Input() set inputFacet(facet: Facet) {
    const options: FacetOptions = {
      ...defaultConfig.facetOptions,
      ...facet.options,
    };
    facet.entries = this.sortViaSelectionAndNumberOfResultsAndName(
      facet.entries
    );
    this.facet = { ...facet, options };
  }

  @Output() facetSelectedEvent = new EventEmitter<SelectedFacet>();
  @Output() unselectAll = new EventEmitter<string>();
  @Output() facetVisualStateChange = new EventEmitter<VisualFacetState>();
  facet!: Facet;
  searchEntries: FacetEntry[] = [];
  searchValue = '';

  constructor() {}

  getFacetEntries(): FacetEntry[] {
    if (this.searchValue !== '') {
      return this.searchEntries;
    }
    if (this.facet.options.facetType === 'single') {
      const selectedEntriesSingleFacet = this.facet.entries.filter(
        (entry) => entry.selected
      );
      if (selectedEntriesSingleFacet.length > 0) {
        return selectedEntriesSingleFacet;
      }
    }
    if (
      this.facet.options.showMoreBehaviour &&
      this.facet.options.showMoreThreshold &&
      this.facet.entries.length > this.facet.options.showMoreThreshold &&
      !this.facet.options.showMoreOpened
    ) {
      return this.facet.entries.slice(0, this.facet.options.showMoreThreshold);
    }
    return this.facet.entries;
  }

  facetSelected(facetEntry: FacetEntry): void {
    if (this.addToURLParams) {
      handleFacetQueryParam(this.facet.name, facetEntry.name);
    }
    this.facet.entries = this.sortViaSelectionAndNumberOfResultsAndName(
      this.facet.entries.map((entry) => {
        if (entry.name === facetEntry.name) {
          entry.selected = !entry.selected;
        }
        return entry;
      })
    );
    this.facetSelectedEvent.emit({
      facetName: this.facet.name,
      facetEntryName: facetEntry.name,
    });
  }
  visualStateChange(
    showMoreOpened: boolean | undefined,
    collapsed: boolean | undefined
  ): void {
    this.facet.options.showMoreOpened = showMoreOpened || false;
    this.facet.options.collapsed = collapsed || false;
    this.facetVisualStateChange.emit({
      facetName: this.facet.name,
      showMoreOpened: this.facet.options.showMoreOpened,
      collapsed: this.facet.options.collapsed,
    });
  }

  handleClickOnCard($event: any): void {
    if ($event.target.nodeName === 'MAT-CARD') {
      $event.preventDefault();
      $event.target.children[0].children[0].click();
    }
  }

  searchValueChanged(): void {
    this.searchEntries = this.facet.entries.filter(
      (facet) =>
        facet.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
    );
  }

  getNumberOfSelectedEntries(): number {
    return this.facet.entries.filter((entry) => entry.selected).length;
  }

  checkSearchOccurrence(): boolean {
    if (this.facet.options.enableSearch) {
      return !(
        (this.getNumberOfSelectedEntries() > 0 &&
          this.facet.options.facetType === 'single') ||
        this.facet.entries.length === 1
      );
    }
    return false;
  }

  getSingleFacetEntryText(facetEntry: FacetEntry): string {
    return this.facet.options.hideNumbers
      ? facetEntry.viewName
      : `${facetEntry.viewName} (${facetEntry.numberOfResults})`;
  }

  private sortViaSelectionAndNumberOfResultsAndName(
    entries: FacetEntry[]
  ): FacetEntry[] {
    if (entries.length > 0) {
      return entries.sort((a, b) => {
        if (getSortImportance(a) < getSortImportance(b)) {
          return 1;
        }
        if (getSortImportance(a) > getSortImportance(b)) {
          return -1;
        }

        if (a.numberOfResults < b.numberOfResults) {
          return 1;
        }
        if (a.numberOfResults > b.numberOfResults) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return -1;
      });
    }
    return entries;
  }
}

function getSortImportance(entry: FacetEntry): number {
  return entry.selected ? 1 : 0;
}

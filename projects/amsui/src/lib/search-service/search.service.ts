import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Facet,
  ResultEntry,
  SearchResultMeta,
  SelectedFacet,
} from './search.types';
import {
  ConnectionPositionPair,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { OverlayLoaderComponent } from '../overlay-loader/overlay-loader.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { ResultTypeCriteria } from '../solr-service/solr.types';
import { defaultConfig } from '../default.config';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly searchResultsSubject = new BehaviorSubject<ResultEntry[]>(
    []
  );
  private readonly searchResultMetaSubject = new BehaviorSubject<SearchResultMeta>(
    defaultConfig.searchResultMeta
  );
  private readonly facetsSubject = new BehaviorSubject<Facet[]>([]);
  private readonly alternativeKeywordsSubject = new BehaviorSubject<string[]>(
    []
  );
  private readonly alternativeResultsSubject = new BehaviorSubject<
    ResultEntry[]
  >([]);
  private internalSelectedFacets: SelectedFacet[] = [];
  private internalselectedFilters: ResultTypeCriteria[] = [];
  private overlayRef!: OverlayRef;
  private overlayElementRef!: ElementRef;

  constructor(private readonly overlay: Overlay) {}

  get searchResults$(): Observable<ResultEntry[]> {
    return this.searchResultsSubject.asObservable();
  }
  set searchResults(searchResults: ResultEntry[]) {
    this.searchResultsSubject.next(searchResults);
  }
  get searchResultMeta$(): Observable<SearchResultMeta> {
    return this.searchResultMetaSubject.asObservable();
  }
  set searchResultMeta(searchResultMeta: SearchResultMeta) {
    this.searchResultMetaSubject.next(searchResultMeta);
  }
  get facets$(): Observable<Facet[]> {
    return this.facetsSubject.asObservable();
  }
  set facets(facets: Facet[]) {
    this.facetsSubject.next(facets);
  }
  get selectedFacets(): SelectedFacet[] {
    return this.internalSelectedFacets;
  }
  set selectedFacets(selectedFacets: SelectedFacet[]) {
    this.internalSelectedFacets = selectedFacets;
  }
  get selectedFilters(): ResultTypeCriteria[] {
    return this.internalselectedFilters;
  }
  set selectedFilters(selectedFilters: ResultTypeCriteria[]) {
    this.internalselectedFilters = selectedFilters;
  }
  get overlayElement(): ElementRef {
    return this.overlayElementRef;
  }
  set overlayElement(overlayElement: ElementRef) {
    this.overlayElementRef = overlayElement;
  }
  get alternativeKeywords$(): Observable<string[]> {
    return this.alternativeKeywordsSubject.asObservable();
  }
  set alternativeKeywords(alternativeKeywords: string[]) {
    this.alternativeKeywordsSubject.next(alternativeKeywords);
  }
  get alternativeResults$(): Observable<ResultEntry[]> {
    return this.alternativeResultsSubject.asObservable();
  }
  set alternativeResults(alternativeResults: ResultEntry[]) {
    this.alternativeResultsSubject.next(alternativeResults);
  }

  toggleSelectedFacet(selectedFacet: SelectedFacet): void {
    const indexOfFacet = this.internalSelectedFacets.findIndex(
      (facet) =>
        facet.facetEntryName === selectedFacet.facetEntryName &&
        facet.facetName === selectedFacet.facetName
    );
    if (indexOfFacet >= 0) {
      this.internalSelectedFacets.splice(indexOfFacet, 1);
    } else {
      this.internalSelectedFacets.push(selectedFacet);
    }
  }
  startLoading(): void {
    this.initOverlay();
    this.overlayRef.attach(new ComponentPortal(OverlayLoaderComponent));
  }
  stopLoading(): void {
    this.overlayRef.dispose();
  }
  resetSearchResults(): void {
    this.searchResults = [];
    this.searchResultMeta = defaultConfig.searchResultMeta;
  }
  initOverlay(): void {
    if (this.overlayElementRef) {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(this.overlayElementRef)
          .withPositions([
            new ConnectionPositionPair(
              { originX: 'start', originY: 'top' },
              { overlayX: 'start', overlayY: 'top' }
            ),
          ]),
        scrollStrategy: this.overlay.scrollStrategies.block(),
        hasBackdrop: true,
        disposeOnNavigation: true,
        panelClass: 'modal',
        backdropClass: 'modal-backdrop',
      });
    } else {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay.position().global(),
        scrollStrategy: this.overlay.scrollStrategies.block(),
        hasBackdrop: true,
        disposeOnNavigation: true,
        panelClass: 'modal',
        backdropClass: 'modal-backdrop',
      });
    }
  }
  setLoadMoreResults(searchResults: ResultEntry[]): void {
    this.searchResultsSubject.next(
      this.searchResultsSubject.getValue().concat(searchResults)
    );
  }
}

import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, delay, map, timeout } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import {
  FacetConfigSolr,
  Highlighting,
  ResultTypeData,
  ResultTypesConfig,
  SearchResultFacet,
  SearchResultFacets,
  SearchResultsSolr,
} from './solr.types';
import {
  Facet,
  FacetEntry,
  FilterTab,
  ResultEntry,
  SearchResultMeta,
  SelectedFacet,
  SortingOption,
  SuggestionParameter,
} from '../search-service/search.types';
import { SearchService } from '../search-service/search.service';

@Injectable({
  providedIn: 'root',
})
export abstract class SolrService implements OnDestroy {
  protected filterViews: FilterTab[] = [];
  protected resultTypesConfig: ResultTypesConfig = {};
  protected searchResults$!: Observable<SearchResultsSolr | null>;
  protected searchResultsSubscription!: Subscription;
  protected solrSearchURL = '';
  protected solrSuggestURL = '';
  protected operator: string = 'AND';
  protected numOfFound = -1;
  protected requestDebounceTime = 500;
  protected numberOfResults = 20;
  protected offset = 0;
  protected highlightFields: string[] = [];
  protected facetsConfig: FacetConfigSolr[] = [];
  protected selectedFacets: SelectedFacet[] = [];
  protected lastSearchResults: ResultEntry[] = [];
  protected suggestions = [
    'Wissen',
    'Wissensmanagement',
    'Wissensmanager',
    'Wissensträger',
    'Wissenstransfer',
    'Mein Wissen',
    'Unser Wissen',
    'Dein Wissen',
    'Besserwisser',
    'Natural Language Processing',
    'NLP',
    'Management',
  ];

  protected constructor(
    protected readonly http: HttpClient,
    protected readonly searchService: SearchService
  ) {}

  protected abstract transformSearchResults(
    docs: any[],
    highlights: Highlighting
  ): ResultEntry[];

  ngOnDestroy(): void {
    this.searchResultsSubscription.unsubscribe();
  }

  search(keyword: string): void {
    this.searchService.resetSearchResults();
    this.offset = 0;
    this.searchResults$ = this.searchSolrRequest(keyword);
    this.transformSolrResponse();
  }

  loadMore(keyword: string): void {
    if (this.numOfFound > this.offset + this.numberOfResults) {
      this.offset += this.numberOfResults;
      this.searchResults$ = this.searchSolrRequest(keyword, true);
      this.transformSolrResponse(true);
    }
  }

  fakeSearchSuggestions(input: SuggestionParameter): Observable<string[]> {
    const filteredSuggestions = this.suggestions
      .filter((option) =>
        option.toLowerCase().includes(input.keyword.toLowerCase())
      )
      .slice(0, input.numberOfSuggestions);
    return of(filteredSuggestions).pipe(delay(300));
  }
  adjustParamsToChangedFilter(filterName: string): void {
    this.facetsConfig = this.resultTypesConfig?.[filterName]?.facets || [];
    this.searchService.selectedFilters =
      this.resultTypesConfig?.[filterName]?.typeCriterias || [];
  }

  getSortingOptions(filterName: string): SortingOption[] {
    return this.resultTypesConfig?.[filterName]?.sortingOptions || [];
  }

  getFiltersForView(): FilterTab[] {
    if (this.filterViews.length <= 0) {
      const filterViews: FilterTab[] = [];
      for (const key of Object.keys(this.resultTypesConfig)) {
        const filterObject = this.resultTypesConfig[key];
        if (filterObject) {
          filterViews.push({
            name: key,
            viewName: filterObject.name,
            icon: filterObject.avatarIcon,
          });
        }
      }
      this.filterViews = filterViews;
    }
    return this.filterViews;
  }

  protected getHighlightedField(
    doc: any,
    highlights: Highlighting,
    field: string,
    docKey: string
  ): string {
    if (highlights && highlights[docKey] && highlights[docKey][field]) {
      const highlightedField = highlights[docKey][field];
      if (Array.isArray(highlightedField)) {
        return highlightedField.join('');
      }
      return highlightedField;
    }
    if (Array.isArray(doc[field])) {
      return doc[field].join('');
    }
    return doc[field];
  }

  protected getSolrParams(keyword: string): HttpParams {
    const facetConfigObject = this.facetConfigToObject(this.facetsConfig);
    const selectedFacetsMap = new Map();
    this.searchService.selectedFacets.forEach((facet) => {
      const facetConfig = this.facetsConfig.filter(
        (facetConfigElement) => facetConfigElement.name === facet.facetName
      )[0];
      let facetName = facetConfigObject[facet.facetName].field;
      if (facetConfig?.facetOptions?.facetType === 'multi') {
        facetName = `{!tag=tag${facetConfigObject[facet.facetName].field}}${
          facetConfigObject[facet.facetName].field
        }`;
      }
      if (selectedFacetsMap.has(facetName)) {
        selectedFacetsMap.set(facetName, [
          ...selectedFacetsMap.get(facetName),
          `${this.escapeSolrQuery(facet.facetEntryName)}`,
        ]);
      } else {
        selectedFacetsMap.set(facetName, [
          `${this.escapeSolrQuery(facet.facetEntryName)}`,
        ]);
      }
    });
    const filterQueryElementsForParam = [];
    for (const filter of this.searchService.selectedFilters) {
      if (filter.value.length > 1) {
        filterQueryElementsForParam.push(
          `${filter.field}:(${filter.value.join(' OR ')})`
        );
      } else {
        filterQueryElementsForParam.push(`${filter.field}:${filter.value}`);
      }
    }
    for (const [key, value] of selectedFacetsMap) {
      if (value.length > 1) {
        filterQueryElementsForParam.push(`${key}:(${value.join(' OR ')})`);
      } else {
        filterQueryElementsForParam.push(`${key}:${value}`);
      }
    }

    const params = {
      q: keyword,
      'q.op': this.operator,
      'json.facet': JSON.stringify(facetConfigObject),
      rows: this.numberOfResults,
      start: this.offset,
      hl: true,
      queryTopic: keyword,
      'hl.fl': this.highlightFields,
      'hl.fragsize': -1,
      'hl.snippets': 10,
      'hl.usePhraseHighlighter': true,
      output: 'json',
    };
    let httpParams = new HttpParams();
    filterQueryElementsForParam.forEach(
      (filter) => (httpParams = httpParams.append('fq', filter))
    );
    for (const key of Object.keys(params)) {
      // @ts-ignore
      httpParams = httpParams.set(key, params[key]);
    }
    return httpParams;
  }

  protected searchSolrRequest(
    keyword: string,
    loadMoreRequest = false
  ): Observable<SearchResultsSolr | null> {
    if (!loadMoreRequest) {
      this.searchService.startLoading();
    }
    this.searchResults$ = this.http
      .get<SearchResultsSolr>(this.solrSearchURL, {
        params: this.getSolrParams(keyword),
      })
      .pipe(
        delay(this.requestDebounceTime),
        timeout(10000),
        catchError(() => {
          if (!loadMoreRequest) {
            this.searchService.stopLoading();
          }
          return of(null);
        })
      );
    return this.searchResults$;
  }

  protected transformSearchResultsMetaInformation(
    searchResultsSolr: SearchResultsSolr
  ): SearchResultMeta {
    return {
      keyword: searchResultsSolr.responseHeader.params.q,
      numFound: searchResultsSolr.response.numFound,
      timeTaken:
        this.requestDebounceTime + searchResultsSolr.responseHeader.QTime,
      didYouMeanValue: this.fakeDidYouMean(),
      numShowed: this.offset + this.numberOfResults,
    } as SearchResultMeta;
  }

  protected escapeSolrQuery(query: string): string {
    return query.replace(/([!*+\-&|()\[\]{}^~?:'" ])/g, `\\$1`);
  }

  protected transformFacets(searchResultFacets: SearchResultFacets): Facet[] {
    const transformedFacets: Facet[] = [];
    if (searchResultFacets) {
      for (const key of Object.keys(searchResultFacets)) {
        const facetConfig = this.facetsConfig.filter(
          (facet) => facet.name === key
        )[0];
        if (!key.startsWith('count')) {
          const buckets = (searchResultFacets[key] as SearchResultFacet)
            .buckets;
          if (buckets.length > 0) {
            const facetEntries = [];
            for (const item of buckets) {
              facetEntries.push({
                name: item.val,
                viewName: !facetConfig.transformFunction
                  ? item.val
                  : facetConfig.transformFunction(item.val),
                numberOfResults: item.count,
                selected: this.searchService.selectedFacets.some((facet) => {
                  return (
                    facet.facetName === key && facet.facetEntryName === item.val
                  );
                }),
              } as FacetEntry);
            }
            transformedFacets.push({
              name: key,
              screenName: facetConfig.screenName,
              entries: facetEntries,
              options: facetConfig.facetOptions,
            });
          }
        }
      }
    }
    return transformedFacets;
  }

  protected transformSolrResponse(loadMoreRequest = false): void {
    if (this.searchResults$) {
      this.searchResultsSubscription = this.searchResults$.subscribe(
        (searchResults) => {
          if (searchResults) {
            this.numOfFound = searchResults.response.numFound;
            this.searchService.facets = this.transformFacets(
              searchResults.facets
            );
            this.searchService.searchResultMeta = this.transformSearchResultsMetaInformation(
              searchResults
            );
            const results = this.transformSearchResults(
              searchResults.response.docs,
              searchResults.highlighting
            );
            if (this.offset > 0) {
              this.searchService.setLoadMoreResults(results);
            } else {
              this.searchService.searchResults = results;
              if (results.length > 0) {
                this.lastSearchResults = results;
              }
            }
            this.searchService.alternativeResults = this.fakeAlternativeResults();
            this.searchService.alternativeKeywords = this.fakeAlternativePopularKeywords();
          }
        },
        () => {
          if (!loadMoreRequest) {
            this.searchService.stopLoading();
          }
        },
        () => {
          if (!loadMoreRequest) {
            this.searchService.stopLoading();
          }
        }
      );
    }
  }

  protected fakeAlternativePopularKeywords(): string[] {
    return this.suggestions;
  }
  protected fakeAlternativeResults(): ResultEntry[] {
    return this.lastSearchResults;
  }

  getSearchSuggestions(input: SuggestionParameter): Observable<string[]> {
    const params = new HttpParams()
      .set('rows', String(input.numberOfSuggestions))
      .set('q', input.keyword);
    return this.http
      .get<any>(this.solrSuggestURL, {
        params,
      })
      .pipe(
        timeout(10000),
        delay(300),
        catchError(() => {
          return of(null);
        }),
        map((response) => {
          return response?.suggest?.contentSuggester[input.keyword]?.suggestions
            .map((suggestion: any) => suggestion.payload)
            .slice(0, input.numberOfSuggestions);
        })
      );
  }

  protected typeData(typeName: string): ResultTypeData {
    const typeObject = this.resultTypesConfig[typeName];
    return {
      avatarToolTip: typeObject?.name || '',
      avatarIcon: typeObject?.avatarIcon || '',
    };
  }

  protected checkIfType(doc: any, typeName: string): boolean {
    const typeObject = this.resultTypesConfig[typeName];
    if (!typeObject) {
      return false;
    }
    for (const typeCriteria of typeObject.typeCriterias) {
      if (!typeCriteria.value.includes(doc[typeCriteria.field])) {
        return false;
      }
    }
    return true;
  }

  private facetConfigToObject(
    facetsConfig: FacetConfigSolr[]
  ): {
    [key: string]: {
      type: string;
      field: string;
      limit: number;
      domain?: { excludeTags: string };
    };
  } {
    const facetObjectMap: {
      [key: string]: {
        type: string;
        field: string;
        limit: number;
        domain?: { excludeTags: string };
      };
    } = {};
    facetsConfig.forEach((facet) => {
      facetObjectMap[facet.name] = {
        type: facet.type,
        field: facet.field,
        limit: facet.limit,
      };
      if (facet?.facetOptions?.facetType === 'multi') {
        facetObjectMap[facet.name].domain = {
          excludeTags: `tag${facet.field}`,
        };
      }
    });
    return facetObjectMap;
  }

  private fakeDidYouMean(): string {
    return Math.random() < 0.5 ? 'Management' : '';
  }
}

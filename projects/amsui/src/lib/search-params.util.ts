import { SelectedFacet } from './search-service/search.types';

export function handleFacetQueryParam(key: string, value: string): void {
  const searchParam = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  const url = new URL(window.location.href);
  const indexOfSearchParam = url.search.indexOf(searchParam);
  if (indexOfSearchParam > 0) {
    url.search = url.search.replace(
      url.search.substr(indexOfSearchParam - 1, searchParam.length + 1),
      ''
    );
  } else {
    const searchParamSeparator = url.search.includes('?') ? '&' : '?';
    url.search += searchParamSeparator + searchParam;
  }
  history.pushState({}, 'null', url.href);
}
export function handleSearchQueryParam(key: string, value: string): void {
  const searchParam = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  const url = new URL(window.location.href);
  const indexOfSearchParam = url.search.indexOf(encodeURIComponent(key) + '=');
  if (indexOfSearchParam > 0) {
    const paramsSearchUntilEnd = url.search.substring(
      indexOfSearchParam + encodeURIComponent(key).length + 1
    );
    const separatorPosition = paramsSearchUntilEnd.indexOf('&');
    url.search = url.search.replace(
      paramsSearchUntilEnd.substring(
        0,
        separatorPosition > 0 ? separatorPosition : paramsSearchUntilEnd.length
      ),
      encodeURIComponent(value)
    );
  } else {
    const searchParamSeparator = url.search.includes('?') ? '&' : '?';
    url.search += searchParamSeparator + searchParam;
  }
  history.pushState({}, 'null', url.href);
}
export function resetToQueryParam(key: string, value: string): void {
  const url = new URL(window.location.href);
  if (value) {
    url.search = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  } else {
    url.search = '';
  }
  history.pushState({}, 'null', url.href);
}

export function paramsToSelectedFacets(params: {
  [key: string]: any;
}): SelectedFacet[] {
  const facets: SelectedFacet[] = [];
  for (const paramKey of Object.keys(params)) {
    if (paramKey !== 'q') {
      if (Array.isArray(params[paramKey])) {
        params[paramKey].forEach((paramValue: string) =>
          facets.push({
            facetName: paramKey,
            facetEntryName: paramValue,
          })
        );
      } else {
        facets.push({
          facetName: paramKey,
          facetEntryName: params[paramKey],
        });
      }
    }
  }
  return facets;
}
export function getSearchKeywordFromURL(
  searchString: string,
  searchQueryParamKey: string
): string {
  const indexOfSearchParam = searchString.indexOf(
    encodeURIComponent(searchQueryParamKey) + '='
  );
  if (indexOfSearchParam > 0) {
    const paramsSearchUntilEnd = searchString.substring(
      indexOfSearchParam + encodeURIComponent(searchQueryParamKey).length + 1
    );
    const separatorPosition = paramsSearchUntilEnd.indexOf('&');
    return decodeURIComponent(
      paramsSearchUntilEnd.substring(
        0,
        separatorPosition > 0 ? separatorPosition : paramsSearchUntilEnd.length
      )
    );
  }
  return '';
}

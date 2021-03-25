import { SortingOption } from '../../search-service/search.types';

export function getDefaultSortingOptionValue(
  sortingOptions: SortingOption[]
): string {
  const defaultValueFiltered = sortingOptions.filter(
    (sortOption) => sortOption.default
  );
  if (defaultValueFiltered.length > 0) {
    return defaultValueFiltered[0].value;
  } else if (sortingOptions.length > 0) {
    return sortingOptions[0].value;
  }
  return '';
}

import { FacetOptions, SortingOption } from '../search-service/search.types';

export class FacetConfigSolr {
  type = 'terms';
  facetOptions: FacetOptions = {};
  transformFunction?: (val: string) => any;
  constructor(
    public field: string,
    public limit: number,
    public screenName: string,
    public name: string
  ) {}
  addFunctionality(
    addons: FacetOptions,
    transformFunction?: any
  ): FacetConfigSolr {
    for (const key of Object.keys(addons)) {
      this.facetOptions[key] = addons[key];
    }
    this.transformFunction = transformFunction;
    return this;
  }
}

export interface SearchResultFacetEntry {
  val: string;
  count: number;
}
export interface SearchResultFacet {
  buckets: SearchResultFacetEntry[];
}
export interface SearchResultFacets {
  count: number;
  [key: string]: SearchResultFacet | number;
}

export interface SearchResultsSolr {
  facets: SearchResultFacets;
  responseHeader: ResponseHeader;
  response: Response;
  highlighting: Highlighting;
}

export interface Highlighting {
  [key: string]: any;
}

export interface Response {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: any[];
}

export interface ResponseHeader {
  status: number;
  QTime: number;
  params: Params;
}

export interface Params {
  'hl.snippets': string;
  q: string;
  'json.facet': string;
  hl: string;
  start: string;
  'hl.fragsize': string;
  'hl.usePhraseHighlighter': string;
  'q.op': string;
  queryTopic: string;
  fq: string;
  'hl.fl': string;
  rows: string;
}

export interface ResultTypesConfig {
  all?: ResultType;
  events?: ResultType;
  documents?: ResultType;
  persons?: ResultType;
  places?: ResultType;
  downloads?: ResultType;
  [key: string]: ResultType | undefined;
}

export interface ResultType {
  name: string;
  avatarIcon: string;
  facets: FacetConfigSolr[];
  sortingOptions: SortingOption[];
  typeCriterias: ResultTypeCriteria[];
}

export interface ResultTypeCriteria {
  field: string;
  value: string[];
}

export interface ResultTypeData {
  avatarToolTip: string;
  avatarIcon: string;
}

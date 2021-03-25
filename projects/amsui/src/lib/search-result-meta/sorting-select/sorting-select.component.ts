import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortingOption } from '../../search-service/search.types';
import { getDefaultSortingOptionValue } from './sorting-select.utils';
import type { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'amsui-sorting-select',
  templateUrl: './sorting-select.component.html',
  styleUrls: ['./sorting-select.component.scss'],
})
export class SortingSelectComponent {
  @Input() disabled = false;
  @Input() formFieldAppearance: MatFormFieldAppearance = 'standard';
  @Input() set defaultSortOption(defaultSortOption: string) {
    this.defaultOption = defaultSortOption;
    this.activeOption = defaultSortOption;
  }
  @Input()
  set sortingOptions(sortingOptions: SortingOption[]) {
    this.options = sortingOptions;
    if (this.defaultOption !== '') {
      this.defaultSortOption = getDefaultSortingOptionValue(sortingOptions);
    }
  }
  get sortingOptions(): SortingOption[] {
    return this.options;
  }
  @Output() sortingChanged = new EventEmitter<string>();
  defaultOption = '';
  activeOption = '';
  private options: SortingOption[] = [];

  constructor() {}

  emitSortEvent(sortType: string): void {
    this.sortingChanged.emit(sortType);
  }
}

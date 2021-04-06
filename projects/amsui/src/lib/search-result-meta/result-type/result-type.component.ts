import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { ResultViewType } from '../../search-service/search.types';
import type { ResultTypeText } from '../../text.types';

@Component({
  selector: 'amsui-result-type',
  templateUrl: './result-type.component.html',
  styleUrls: ['./result-type.component.scss'],
})
export class ResultTypeComponent {
  @Input() disabled = false;
  @Input() selectedResultType!: ResultViewType;
  @Input() resultTypeText?: ResultTypeText;
  @Input() resultTypes: ResultViewType[] = [];
  @Output() resultViewTypeChanged = new EventEmitter<ResultViewType>();

  constructor() {}

  emitResultViewTypeChange(resultViewType: ResultViewType): void {
    this.resultViewTypeChanged.emit(resultViewType);
  }
}

import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'amsui-did-you-mean',
  templateUrl: './did-you-mean.component.html',
  styleUrls: ['./did-you-mean.component.scss'],
})
export class DidYouMeanComponent {
  @Input() value = '';
  @Input() didYouMeanText?: string;
  @Output() didYouMeanEvent = new EventEmitter<string>();

  constructor() {}

  didYouMeanClick(didYouMeanValue: string): void {
    this.didYouMeanEvent.emit(didYouMeanValue);
  }
}

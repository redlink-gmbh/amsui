import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import type {
  ResultEntry,
  ResultEntryActionEvent,
} from '../../search-service/search.types';
import { defaultConfig } from '../../default.config';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'amsui-result-entry',
  templateUrl: './result-entry.component.html',
  styleUrls: ['./result-entry.component.scss'],
})
export class ResultEntryComponent implements AfterViewInit, OnChanges {
  @Input() entry!: ResultEntry;
  @Input() highlightingActivated = defaultConfig.highlightingActivated;
  @Output() actionClicked = new EventEmitter<ResultEntryActionEvent>();
  @Input() showMoreWordLimit = defaultConfig.showMoreWordLimit;
  showMoreContent = false;
  showMoreWords!: number;
  showMoreWordLimitThreshold = 50;
  constructor(
    private readonly elRef: ElementRef,
    private readonly translateService: TranslateService
  ) {}

  ngAfterViewInit(): void {
    this.toggleHighlighting();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.highlightingActivated) {
      this.toggleHighlighting();
    }
  }

  emitActionEvent(actionName: string): void {
    this.actionClicked.emit({ actionName, entry: this.entry });
  }

  private toggleHighlighting(): void {
    this.elRef.nativeElement
      .querySelectorAll('em')
      .forEach((node: HTMLElement) => {
        if (this.highlightingActivated) {
          node.classList.add('highlight');
          node.classList.remove('no-highlight');
        } else {
          node.classList.add('no-highlight');
          node.classList.remove('highlight');
        }
      });
  }

  getEntryDescription(): string {
    let desc = '';
    if (this.entry.description) {
      if (this.showMoreContent || !this.checkIfNeedShowMore()) {
        desc = this.entry.description;
      } else {
        const words = this.entry.description.trim().split(/\s+/);
        this.showMoreWords = words.slice(
          this.showMoreWordLimit + this.showMoreWordLimitThreshold + 1
        ).length;
        desc =
          words
            .slice(0, this.showMoreWordLimit + this.showMoreWordLimitThreshold)
            .join(' ') + '...';
      }
    }
    this.toggleHighlighting();
    return desc;
  }

  checkIfNeedShowMore(): boolean {
    return (
      typeof this.entry.description !== 'undefined' &&
      this.entry.description !== '' &&
      this.entry.description.split(' ').length > this.showMoreWordLimit
    );
  }

  getWordsNumber(): number {
    if (Math.round(this.showMoreWords / 50) * 50 === 0) {
      return 50;
    }
    return Math.round(this.showMoreWords / 50) * 50;
  }

  getShowMoreButtonDescription(): Observable<string> {
    if (!this.showMoreContent) {
      const numberOfWords = this.getWordsNumber();
      if (numberOfWords <= 50) {
        return this.translateService.get('searchResultEntry.showFewMore');
      }
      return this.translateService.get('searchResultEntry.showMore', {
        showMoreWords: numberOfWords,
      });
    }
    return this.translateService.get('searchResultEntry.showLess');
  }
}

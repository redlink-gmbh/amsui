import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsWrapperComponent } from './search-results-wrapper.component';

describe('SearchResultsWrapperComponent', () => {
  let component: SearchResultsWrapperComponent;
  let fixture: ComponentFixture<SearchResultsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsWrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

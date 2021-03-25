import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultMetaComponent } from './search-result-meta.component';

describe('SearchResultMetaComponent', () => {
  let component: SearchResultMetaComponent;
  let fixture: ComponentFixture<SearchResultMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultMetaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

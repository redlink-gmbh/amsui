import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultTextComponent } from './search-result-text.component';

describe('SearchResultTextComponent', () => {
  let component: SearchResultTextComponent;
  let fixture: ComponentFixture<SearchResultTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultEntryComponent } from './result-entry.component';

describe('ResultGridEntryComponent', () => {
  let component: ResultEntryComponent;
  let fixture: ComponentFixture<ResultEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultEntryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingSelectComponent } from './sorting-select.component';

describe('SortingSelectComponent', () => {
  let component: SortingSelectComponent;
  let fixture: ComponentFixture<SortingSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortingSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

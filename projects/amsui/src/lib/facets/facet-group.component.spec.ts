import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetGroupComponent } from './facet-group.component';

describe('FacetsComponent', () => {
  let component: FacetGroupComponent;
  let fixture: ComponentFixture<FacetGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacetGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

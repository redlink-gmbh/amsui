import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetGroupComponent } from './facet-group.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FacetModule } from './facet/facet.module';
import { MatButtonModule } from '@angular/material/button';
import { getFacets } from './facet-group.stories';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

let loader: HarnessLoader;

describe('FacetsComponent', () => {
  let component: FacetGroupComponent;
  let fixture: ComponentFixture<FacetGroupComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacetGroupComponent],
      imports: [
        CommonModule,
        FacetModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(FacetGroupComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.facets = getFacets();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should collapse all', async () => {
    fixture.detectChanges();
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: /^(unfold_less|unfold_more)$/ })
    );
    await button.click();
    expect(
      component.visualStateFacets.every((vsf) => vsf.collapsed)
    ).toBeTruthy();
  });

  it('should show that no filters are available', async () => {
    component.facets = [];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.no-filters'))).toBeTruthy();
  });
});

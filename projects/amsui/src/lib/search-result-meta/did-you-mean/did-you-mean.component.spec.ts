import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DidYouMeanComponent } from './did-you-mean.component';

describe('DidYouMeanComponent', () => {
  let component: DidYouMeanComponent;
  let fixture: ComponentFixture<DidYouMeanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DidYouMeanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DidYouMeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

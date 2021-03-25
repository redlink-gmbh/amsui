import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayLoaderComponent } from './overlay-loader.component';

@NgModule({
  declarations: [OverlayLoaderComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [OverlayLoaderComponent],
})
export class OverlayLoaderModule {}

import { NgModule } from '@angular/core';
import { SearchFieldComponent } from './search-field.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SearchFieldComponent],
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    TranslateModule,
  ],
  exports: [SearchFieldComponent],
})
export class SearchFieldModule {}

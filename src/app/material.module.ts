import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule
} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatTooltipModule,
        MatExpansionModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ]
})

export class MaterialModule {}

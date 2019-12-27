import { NgModule } from '@angular/core';
import { 
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatMenuModule, MatToolbarModule, MatFormFieldModule, MatInputModule],
    exports: [MatButtonModule, MatMenuModule, MatToolbarModule, MatFormFieldModule, MatInputModule]
})

export class MaterialModule {}

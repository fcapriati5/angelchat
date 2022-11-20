import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatInputModule,
  ],
  exports: [
    MatSidenavModule,
    MatExpansionModule,
    MatInputModule,
  ]
})
export class MaterialModule { }

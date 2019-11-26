import { NgModule } from '@angular/core';
import { PlaceComponent } from './place/place.component';
import { SharedModule } from '../shared/shared.module';
import { OwnerRoutingModule } from './owner.routing.module';
import { PlaceManagementComponent } from './place-management/place-management.component';
import { CreateMenuDialogComponent } from './place-management/create-menu-dialog/create-menu-dialog.component';
import { CreateOptionDialogComponent } from './place-management/create-option-dialog/create-option-dialog.component';
import { OccasionalTypesSectionComponent } from './place-management/occassional-types-section/occasional-types-section.component';
import { CreateHallDialogComponent } from './place-management/create-hall-dialog/create-hall-dialog.component';
import { HallManagementComponent } from './hall-management/hall-management.component';
import { CreateMealDialogComponent } from './place-management/menu-section/create-meal-dialog/create-meal-dialog.component';
import { MenuDetailsComponent } from './place-management/menu-section/menu-details/menu-details.component';

@NgModule({
  declarations: [PlaceComponent,
    PlaceManagementComponent,
    CreateMenuDialogComponent,
    CreateOptionDialogComponent,
    OccasionalTypesSectionComponent,
    CreateHallDialogComponent,
    HallManagementComponent,
    CreateMealDialogComponent,
    MenuDetailsComponent],
  imports: [
    SharedModule,
    OwnerRoutingModule
  ],
  exports: [
    OwnerRoutingModule
  ]
  ,
})
export class OwnerModule { }

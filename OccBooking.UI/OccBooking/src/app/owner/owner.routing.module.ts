import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceComponent } from './place/place.component';
import { OwnerGuard } from './guards/owner.guard';
import { PlaceManagementComponent } from './place-management/place-management.component';

const routes: Routes = [
  {
    path: 'owner', component: PlaceComponent, canActivate: [OwnerGuard],
  },
  {
    path: 'owner/place-management/:id', component: PlaceManagementComponent, canActivate: [OwnerGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [OwnerGuard]
})
export class OwnerRoutingModule { }

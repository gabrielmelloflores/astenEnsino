import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UsuariosComponent } from '../list/usuarios.component';
import { UsuariosDetailComponent } from '../detail/usuarios-detail.component';
import { UsuariosUpdateComponent } from '../update/usuarios-update.component';
import { UsuariosRoutingResolveService } from './usuarios-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const usuariosRoute: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UsuariosDetailComponent,
    resolve: {
      usuarios: UsuariosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UsuariosUpdateComponent,
    resolve: {
      usuarios: UsuariosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UsuariosUpdateComponent,
    resolve: {
      usuarios: UsuariosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(usuariosRoute)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}

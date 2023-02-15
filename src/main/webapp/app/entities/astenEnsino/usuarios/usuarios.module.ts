import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UsuariosComponent } from './list/usuarios.component';
import { UsuariosDetailComponent } from './detail/usuarios-detail.component';
import { UsuariosUpdateComponent } from './update/usuarios-update.component';
import { UsuariosDeleteDialogComponent } from './delete/usuarios-delete-dialog.component';
import { UsuariosRoutingModule } from './route/usuarios-routing.module';

@NgModule({
  imports: [SharedModule, UsuariosRoutingModule],
  declarations: [UsuariosComponent, UsuariosDetailComponent, UsuariosUpdateComponent, UsuariosDeleteDialogComponent],
})
export class AstenEnsinoUsuariosModule {}

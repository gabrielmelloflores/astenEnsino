import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'usuarios',
        data: { pageTitle: 'astenEnsinoApp.astenEnsinoUsuarios.home.title' },
        loadChildren: () => import('./astenEnsino/usuarios/usuarios.module').then(m => m.AstenEnsinoUsuariosModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUsuarios } from '../usuarios.model';
import { UsuariosService } from '../service/usuarios.service';

@Injectable({ providedIn: 'root' })
export class UsuariosRoutingResolveService implements Resolve<IUsuarios | null> {
  constructor(protected service: UsuariosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUsuarios | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((usuarios: HttpResponse<IUsuarios>) => {
          if (usuarios.body) {
            return of(usuarios.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}

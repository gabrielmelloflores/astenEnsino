import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUsuarios, NewUsuarios } from '../usuarios.model';

export type PartialUpdateUsuarios = Partial<IUsuarios> & Pick<IUsuarios, 'id'>;

export type EntityResponseType = HttpResponse<IUsuarios>;
export type EntityArrayResponseType = HttpResponse<IUsuarios[]>;

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/usuarios', 'astenensino');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(usuarios: NewUsuarios): Observable<EntityResponseType> {
    return this.http.post<IUsuarios>(this.resourceUrl, usuarios, { observe: 'response' });
  }

  update(usuarios: IUsuarios): Observable<EntityResponseType> {
    return this.http.put<IUsuarios>(`${this.resourceUrl}/${this.getUsuariosIdentifier(usuarios)}`, usuarios, { observe: 'response' });
  }

  partialUpdate(usuarios: PartialUpdateUsuarios): Observable<EntityResponseType> {
    return this.http.patch<IUsuarios>(`${this.resourceUrl}/${this.getUsuariosIdentifier(usuarios)}`, usuarios, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUsuarios>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUsuarios[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUsuariosIdentifier(usuarios: Pick<IUsuarios, 'id'>): number {
    return usuarios.id;
  }

  compareUsuarios(o1: Pick<IUsuarios, 'id'> | null, o2: Pick<IUsuarios, 'id'> | null): boolean {
    return o1 && o2 ? this.getUsuariosIdentifier(o1) === this.getUsuariosIdentifier(o2) : o1 === o2;
  }

  addUsuariosToCollectionIfMissing<Type extends Pick<IUsuarios, 'id'>>(
    usuariosCollection: Type[],
    ...usuariosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const usuarios: Type[] = usuariosToCheck.filter(isPresent);
    if (usuarios.length > 0) {
      const usuariosCollectionIdentifiers = usuariosCollection.map(usuariosItem => this.getUsuariosIdentifier(usuariosItem)!);
      const usuariosToAdd = usuarios.filter(usuariosItem => {
        const usuariosIdentifier = this.getUsuariosIdentifier(usuariosItem);
        if (usuariosCollectionIdentifiers.includes(usuariosIdentifier)) {
          return false;
        }
        usuariosCollectionIdentifiers.push(usuariosIdentifier);
        return true;
      });
      return [...usuariosToAdd, ...usuariosCollection];
    }
    return usuariosCollection;
  }
}

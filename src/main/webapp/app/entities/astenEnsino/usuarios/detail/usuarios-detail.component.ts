import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuarios } from '../usuarios.model';

@Component({
  selector: 'jhi-usuarios-detail',
  templateUrl: './usuarios-detail.component.html',
})
export class UsuariosDetailComponent implements OnInit {
  usuarios: IUsuarios | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuarios }) => {
      this.usuarios = usuarios;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

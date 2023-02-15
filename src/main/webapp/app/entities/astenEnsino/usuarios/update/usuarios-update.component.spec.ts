import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UsuariosFormService } from './usuarios-form.service';
import { UsuariosService } from '../service/usuarios.service';
import { IUsuarios } from '../usuarios.model';

import { UsuariosUpdateComponent } from './usuarios-update.component';

describe('Usuarios Management Update Component', () => {
  let comp: UsuariosUpdateComponent;
  let fixture: ComponentFixture<UsuariosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let usuariosFormService: UsuariosFormService;
  let usuariosService: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UsuariosUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(UsuariosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsuariosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    usuariosFormService = TestBed.inject(UsuariosFormService);
    usuariosService = TestBed.inject(UsuariosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const usuarios: IUsuarios = { id: 456 };

      activatedRoute.data = of({ usuarios });
      comp.ngOnInit();

      expect(comp.usuarios).toEqual(usuarios);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarios>>();
      const usuarios = { id: 123 };
      jest.spyOn(usuariosFormService, 'getUsuarios').mockReturnValue(usuarios);
      jest.spyOn(usuariosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuarios }));
      saveSubject.complete();

      // THEN
      expect(usuariosFormService.getUsuarios).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(usuariosService.update).toHaveBeenCalledWith(expect.objectContaining(usuarios));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarios>>();
      const usuarios = { id: 123 };
      jest.spyOn(usuariosFormService, 'getUsuarios').mockReturnValue({ id: null });
      jest.spyOn(usuariosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarios: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuarios }));
      saveSubject.complete();

      // THEN
      expect(usuariosFormService.getUsuarios).toHaveBeenCalled();
      expect(usuariosService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarios>>();
      const usuarios = { id: 123 };
      jest.spyOn(usuariosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(usuariosService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

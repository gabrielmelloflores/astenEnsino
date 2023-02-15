import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../usuarios.test-samples';

import { UsuariosFormService } from './usuarios-form.service';

describe('Usuarios Form Service', () => {
  let service: UsuariosFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosFormService);
  });

  describe('Service methods', () => {
    describe('createUsuariosFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUsuariosFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            email: expect.any(Object),
            password: expect.any(Object),
          })
        );
      });

      it('passing IUsuarios should create a new form with FormGroup', () => {
        const formGroup = service.createUsuariosFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            email: expect.any(Object),
            password: expect.any(Object),
          })
        );
      });
    });

    describe('getUsuarios', () => {
      it('should return NewUsuarios for default Usuarios initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUsuariosFormGroup(sampleWithNewData);

        const usuarios = service.getUsuarios(formGroup) as any;

        expect(usuarios).toMatchObject(sampleWithNewData);
      });

      it('should return NewUsuarios for empty Usuarios initial value', () => {
        const formGroup = service.createUsuariosFormGroup();

        const usuarios = service.getUsuarios(formGroup) as any;

        expect(usuarios).toMatchObject({});
      });

      it('should return IUsuarios', () => {
        const formGroup = service.createUsuariosFormGroup(sampleWithRequiredData);

        const usuarios = service.getUsuarios(formGroup) as any;

        expect(usuarios).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUsuarios should not enable id FormControl', () => {
        const formGroup = service.createUsuariosFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUsuarios should disable id FormControl', () => {
        const formGroup = service.createUsuariosFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

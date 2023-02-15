import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUsuarios, NewUsuarios } from '../usuarios.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUsuarios for edit and NewUsuariosFormGroupInput for create.
 */
type UsuariosFormGroupInput = IUsuarios | PartialWithRequiredKeyOf<NewUsuarios>;

type UsuariosFormDefaults = Pick<NewUsuarios, 'id'>;

type UsuariosFormGroupContent = {
  id: FormControl<IUsuarios['id'] | NewUsuarios['id']>;
  email: FormControl<IUsuarios['email']>;
  password: FormControl<IUsuarios['password']>;
};

export type UsuariosFormGroup = FormGroup<UsuariosFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UsuariosFormService {
  createUsuariosFormGroup(usuarios: UsuariosFormGroupInput = { id: null }): UsuariosFormGroup {
    const usuariosRawValue = {
      ...this.getFormDefaults(),
      ...usuarios,
    };
    return new FormGroup<UsuariosFormGroupContent>({
      id: new FormControl(
        { value: usuariosRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      email: new FormControl(usuariosRawValue.email),
      password: new FormControl(usuariosRawValue.password),
    });
  }

  getUsuarios(form: UsuariosFormGroup): IUsuarios | NewUsuarios {
    return form.getRawValue() as IUsuarios | NewUsuarios;
  }

  resetForm(form: UsuariosFormGroup, usuarios: UsuariosFormGroupInput): void {
    const usuariosRawValue = { ...this.getFormDefaults(), ...usuarios };
    form.reset(
      {
        ...usuariosRawValue,
        id: { value: usuariosRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UsuariosFormDefaults {
    return {
      id: null,
    };
  }
}

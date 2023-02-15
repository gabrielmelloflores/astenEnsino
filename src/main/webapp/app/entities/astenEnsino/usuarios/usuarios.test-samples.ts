import { IUsuarios, NewUsuarios } from './usuarios.model';

export const sampleWithRequiredData: IUsuarios = {
  id: 97822,
};

export const sampleWithPartialData: IUsuarios = {
  id: 46659,
  email: 'Elo_Barros59@hotmail.com',
};

export const sampleWithFullData: IUsuarios = {
  id: 45728,
  email: 'Isaac_Carvalho85@yahoo.com',
  password: 'Malaysian Macio',
};

export const sampleWithNewData: NewUsuarios = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

export interface IUsuarios {
  id: number;
  email?: string | null;
  password?: string | null;
}

export type NewUsuarios = Omit<IUsuarios, 'id'> & { id: null };

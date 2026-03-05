import { BaseFiltro } from "./base-filtro";
import { type ICombo } from "./combo";

export interface Rol {
  rolId: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  admin: boolean;
  filtro: string;
  seleccionado: boolean;
  estado: string;
  estadoCodigo: string;
  habilitado: boolean | string;
  celular: string;
  combo: RolCombo;
}

export interface RolCombo {
  estado: ICombo | null;
}

export class RolFiltro extends BaseFiltro implements Partial<Rol> {
  nombre!: string;
  codigo!: string;
  filtro!: string;
}

export interface ICombo {
  list: IComboItem[];
  size: number;
}

export interface IComboItem {
  id?: number | string;
  codigo?: string;
  nombre?: string;
  descripcion?: string;
}

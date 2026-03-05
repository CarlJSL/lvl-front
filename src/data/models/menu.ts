export interface Menu {
  children?: Menu[];
  icono: string;
  text: string;
  to?: string | null;
  title?: string;
  menuRolId: string;
}

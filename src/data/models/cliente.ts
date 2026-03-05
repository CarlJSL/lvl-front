import { BaseFiltro } from "./base-filtro"

export interface Cliente {
  empresaId: string
  ruc: string
  razonSocial: string
  nombreComercial: string
  tipoCodigo: string
  tipo: string
  estadoCodigo: string
  estado: string
  telefono: string
  direccion: string
  departamentoCodigo: string
  provinciaCodigo: string
  distritoCodigo: string
  departamento: string
  provincia: string
  distrito: string
  correo: string
  esRetenedor: boolean
  fechaInicioRetenedor: string
  fechaRegistro: string
  nombreRepresentanteLegal: string
  telefonoRepresentanteLegal: string
  correoRepresentanteLegal: string
}

export class ClienteFiltro extends BaseFiltro implements Partial<Cliente> {
  empresaId!: string;
  ruc!: string;
  razonSocial!: string;
  estado!: string;
  estadoCodigo!: string;
  tipoCodigo!: string
  esRetenedor!: boolean
}

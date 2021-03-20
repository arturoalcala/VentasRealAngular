import {Detalle} from './detalle';

export interface Venta {
  idCliente: number;
  detalle: Detalle[];
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../models/cliente';
import { ApiclienteService } from '../services/apicliente.service';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.scss']
})
export class ClienteDetalleComponent implements OnInit {

  public cliente: Cliente;

  constructor(
    private route: ActivatedRoute,
    private apiCliente: ApiclienteService,
  ) { }

  ngOnInit(): void {
    var listaClientes: any[];
    this.apiCliente.getClientes().subscribe(response => {
      listaClientes = response.data;
      this.route.paramMap.subscribe(response2 => {
        this.cliente = listaClientes[+response2.get('id')];
      });
    });
  }

}

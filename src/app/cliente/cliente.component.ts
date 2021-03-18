import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../models/response';
import { DialogclienteComponent } from '../dialogcliente/dialogcliente.component';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../models/cliente';
import { DialogconfirmComponent } from '../common/dialogconfirm/dialogconfirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public listaClientes: any[];
  public columnas: string[] = ['id', 'nombre', 'actions'];
  readonly width: string = '300px';

  constructor(
    private apiCliente: ApiclienteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
    this.apiCliente.getClientes().subscribe(response => {
      this.listaClientes = response.data;
    });
  }

  showAddClient() {
    const dialogRef = this.dialog.open(DialogclienteComponent,
      {
        width: this.width
      })
      dialogRef.afterClosed().subscribe(result => {
        this.getClientes();
      });
  }

  showUpdateClient(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogclienteComponent,
      {
        width: this.width,
        data: cliente
      })
      dialogRef.afterClosed().subscribe(result => {
        this.getClientes();
      })
  }

  showConfirmDeleteClient(id: number) {
    const dialogRef = this.dialog.open(DialogconfirmComponent,
      {
        width: this.width
      })
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.apiCliente.deleteClient(id).subscribe(response => {
            if(response.success == 1) {
              this.snackBar.open(
                "Cliente eliminado con éxito.",
                "",
                { duration: 2000 });
                this.getClientes();
            }
            else {
              this.snackBar.open(
                "No fue posible eliminar el cliente.",
                "",
                { duration: 2000 });
            }
          })
        }
      })
  }
}

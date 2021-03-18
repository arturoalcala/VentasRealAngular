import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../models/cliente';
import { ApiclienteService } from '../services/apicliente.service';

@Component({
  selector: 'app-dialogcliente',
  templateUrl: './dialogcliente.component.html',
  styleUrls: ['./dialogcliente.component.scss']
})
export class DialogclienteComponent implements OnInit {

  public nombre: string;

  constructor(
    public dialogRef: MatDialogRef<DialogclienteComponent>,
    public apiCliente: ApiclienteService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente
  ) {
    if(this.cliente != null) {
      this.nombre = this.cliente.nombre;
    }
   }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  addClient(){
    const cliente: Cliente = {
      id: 0,
      nombre: this.nombre
    };
    this.apiCliente.addClient(cliente).subscribe(response => {
      if(response.success == 1) {
        this.closeDialog();
        this.snackBar.open(
          "Cliente agregado con éxito.",
          "",
          { duration: 2000 });
        }
    })
  }

  updateClient(){
    const cliente: Cliente = {
      id: this.cliente.id,
      nombre: this.nombre
    };
    this.apiCliente.updateClient(cliente).subscribe(response => {
      if(response.success == 1) {
        this.closeDialog();
        this.snackBar.open(
          "Cliente modificado con éxito.",
          "",
          { duration: 2000 });
        }
    })
  }
}

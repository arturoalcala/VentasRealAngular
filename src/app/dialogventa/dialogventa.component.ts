import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Detalle } from '../models/detalle';
import { Venta } from '../models/venta';
import { ApiventaService } from '../services/apiventa.service';

@Component({
  selector: 'app-dialogventa',
  templateUrl: './dialogventa.component.html',
  styleUrls: ['./dialogventa.component.scss']
})
export class DialogVentaComponent implements OnInit {

  public venta: Venta;
  public detalle: Detalle[];

  public detalleForm = this.formBuilder.group({
    cantidad: [0, Validators.required],
    precioUnitario: [0, Validators.required],
    idProducto: [1, Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<DialogVentaComponent>,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public apiVenta: ApiventaService
  ) {
    this.detalle = [];
    this.venta = { idCliente: 1, detalle: [] };
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addDetalle() {
    this.detalle.push(this.detalleForm.value);
  }

  addVenta() {
    this.venta.detalle = this.detalle;
    this.apiVenta.addVenta(this.venta).subscribe(response => {
      if (response.success === 1 || response.success.toString() === "1") {
        this.closeDialog();
        this.snackBar.open(
          "Venta realizada con éxito",
          "",
          { duration: 200 });
      }
    });
  }
}

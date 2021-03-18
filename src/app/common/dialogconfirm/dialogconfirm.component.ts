import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogconfirm',
  templateUrl: './dialogconfirm.component.html',
  styleUrls: ['./dialogconfirm.component.scss']
})
export class DialogconfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogconfirmComponent>,
  ) { }

  ngOnInit(): void {
  }

}

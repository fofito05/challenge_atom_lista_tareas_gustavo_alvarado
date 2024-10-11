import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TareaI } from 'src/app/models/tareaagregar.interface';

@Component({
  selector: 'app-dialogtarea',
  templateUrl: './dialogtarea.component.html',
  styleUrls: ['./dialogtarea.component.scss']
})
export class DialogtareaComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: TareaI, public dialogRef: MatDialogRef<DialogtareaComponent>) { }


  ngOnInit() {


  }

  cancelar() {
    this.dialogRef.close();
  }


}



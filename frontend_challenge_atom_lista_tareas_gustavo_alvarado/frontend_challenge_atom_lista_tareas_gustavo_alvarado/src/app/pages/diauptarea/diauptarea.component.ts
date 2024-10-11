import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TareaActualizarI } from 'src/app/models/tareaactualizar.interface';

@Component({
  selector: 'app-diauptarea',
  templateUrl: './diauptarea.component.html',
  styleUrls: ['./diauptarea.component.scss']
})
export class DiauptareaComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: TareaActualizarI, public dialogRef: MatDialogRef<DiauptareaComponent>) { }


  ngOnInit() {


  }

  cancelar() {
    this.dialogRef.close();
  }


}

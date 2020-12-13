import { ConfirmGirthsComponent } from './confirmGirths';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GirthsService } from 'src/app/Services/girths.service';

@Component({
  selector: 'app-girths',
  templateUrl: './girths.component.html',
  styleUrls: ['./girths.component.css']
})
export class GirthsComponent implements OnInit {

  constructor(private dialog: MatDialog, private girthsService: GirthsService) { }

  girthTiles = this.girthsService.girthTiles
  girthTilesDescriptions = this.girthsService.girthTilesDescription
  listOfZeroGirths: string
  measurementDate: string
  isAllSet = false

  ngOnInit() {
  }

  save() {
    const zeroMeasure = []
    // crea un array con le girths non prese
    this.girthTiles.map(girths => {
      if (girths.value === null) {
        zeroMeasure.push(girths.title)
      }
    })
    // Prepara il testo per l'alert
    if (zeroMeasure.length === 0) {
      // passa il testo (Tutte le girths prese)
      this.isAllSet = true
      this.listOfZeroGirths = ""
    } else {
      // Crea la stringa con le girths non prese
      this.listOfZeroGirths = zeroMeasure.join("; ")
    }

    // Apre l'allert

    const dialogRef = this.dialog.open(ConfirmGirthsComponent, {
      data: {
        isAllSet: this.isAllSet,
        listOfZeroGirths: this.listOfZeroGirths,
        measurementDate: this.measurementDate

      }

    });

    // Se save passa i dati ale service altrimenti ritorna all'inserimento
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.measurementDate = result
        this.girthsService.saveGirthsToDB(this.measurementDate)
      }
    })
  }
}
export interface DialogData {
  measurementDate: string;
  isAllSet: boolean,
  listOfZeroGirths: string,
}

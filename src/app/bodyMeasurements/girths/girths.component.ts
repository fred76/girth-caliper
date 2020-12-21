import { ConfirmGirthsComponent } from './confirmGirths';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GirthsService } from 'src/app/bodyMeasurements/girths.service';

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

  ngOnInit() { }

  save() {
    const zeroMeasure = []

    this.girthTiles.map(girths => {
      if (girths.value === null) {
        zeroMeasure.push(girths.title)
      }
    })
    if (zeroMeasure.length === 0) {
      this.isAllSet = true
      this.listOfZeroGirths = ""
    } else {
      this.listOfZeroGirths = zeroMeasure.join("; ")
    }

    const dialogRef = this.dialog.open(ConfirmGirthsComponent, {
      data: {
        isAllSet: this.isAllSet,
        listOfZeroGirths: this.listOfZeroGirths,
        measurementDate: this.measurementDate
      }
    });

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

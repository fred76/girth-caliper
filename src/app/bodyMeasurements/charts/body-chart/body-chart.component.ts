import { DummyDataService } from './../../../Utility/dummyData.service';
import { ChartService } from './../../../Services/chart.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-body-chart',
  templateUrl: './body-chart.component.html',
  styleUrls: ['./body-chart.component.css']
})
export class BodyChartComponent implements OnInit {

  constructor(
    private dummyDataService: DummyDataService,
    private chartsService: ChartService) { }

  lineChartGirthsOverSkinfolds: any
  localDummyArray = []
  localDummyArrayGirths = []

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }
  data: any
  ngOnInit() {
    this.selected_girth_skinfold_id = 1;
    let localDummyArray = [...this.dummyDataService.dummyArraySkinfolds]
    let localDummyArrayLoc = [...localDummyArray].sort((d1, d2) => new Date(d1.metadata.date).getTime() - new Date(d2.metadata.date).getTime())
    this.localDummyArray = localDummyArrayLoc
    this.localDummyArrayGirths = [...this.dummyDataService.dummyArray]
    this.data = this.chartsService.compareGirthsSkinfolds(this.localDummyArray, this.localDummyArrayGirths)
    this.lineChartGirthsOverSkinfolds = this.chartsService.lineChartGirthsOverSkinfolds(this.data.armDataSet, this.data.avarageDateArray, this.data.maxArm)

  }
  girth_skinfold: any[] = [
    { name: 'Arm - girth & skinfold', id: 1 },
    { name: 'Chest - girth & skinfold', id: 2 },
    { name: 'Abdominal - girth & skinfold', id: 3 },
    { name: 'Thigt - girth & skinfold', id: 4 },
    { name: 'Calf - girth & skinfold', id: 5 }
  ];

  selected_girth_skinfold_id: any;

  selectChart(girth_skinfold) {
    this.selected_girth_skinfold_id = girth_skinfold.id;
    let a = []
    let max: number
    console.log("ssss")
    switch (true) {
      case girth_skinfold.id == 1: a = this.data.armDataSet, a = this.data.armDataSet; max = this.data.maxArm; break
      case girth_skinfold.id == 2: a = this.data.chestDataSet; max = this.data.maxChest; break
      case girth_skinfold.id == 3: a = this.data.abdominalDataSet; max = this.data.maxAbs; break
      case girth_skinfold.id == 4: a = this.data.thighDataSet; max = this.data.maxThigh; break
      case girth_skinfold.id == 5: a = this.data.armDataSet; max = this.data.maxCalf; break

    }

    this.chartsService.UpdateLineChartGirthsOverSkinfolds(this.lineChartGirthsOverSkinfolds, a, max)

  }
}


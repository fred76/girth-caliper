import { element } from 'protractor';

import { CaliperForDB } from './../interface-model/caliper.model';
import { Girths } from './../interface-model/girths.model';
import { Utility } from './../Utility/utility';
import { Injectable } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType, ChartPluginsOptions } from 'chart.js';
import { Label } from 'ng2-charts';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Injectable({
  providedIn: 'root'
})

export class ChartService {

  constructor(private utility: Utility) { }

  weight = []
  neck = []
  chest = []
  bicep_R = []
  bicep_L = []
  bicep_R_Relax = []
  bicep_L_Relax = []
  forearm_R = []
  forearm_L = []
  wrist = []
  waist = []
  hips = []
  thigh_R = []
  thigh_L = []
  calf_R = []
  calf_L = []
  date = []
  createGirthsArrayForCharts(arraOfGirths: Girths[]) {
    this.weight = []
    this.neck = []
    this.chest = []
    this.bicep_L = []
    this.bicep_R = []
    this.bicep_L_Relax = []
    this.bicep_R_Relax = []
    this.forearm_L = []
    this.forearm_R = []
    this.wrist = []
    this.waist = []
    this.hips = []
    this.thigh_L = []
    this.thigh_R = []
    this.calf_L = []
    this.calf_R = []
    this.date = []
    let localGirthObject = [...arraOfGirths].sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime())
    localGirthObject.map(p => {
      this.weight.push(p.weight)
      this.neck.push(p.neck)
      this.chest.push(p.chest)
      this.bicep_L.push(p.bicep_L)
      this.bicep_R.push(p.bicep_R)
      this.bicep_L_Relax.push(p.bicep_L_Relax)
      this.bicep_R_Relax.push(p.bicep_R_Relax)
      this.forearm_L.push(p.forearm_L)
      this.forearm_R.push(p.forearm_R)
      this.wrist.push(p.wrist)
      this.waist.push(p.waist)
      this.hips.push(p.hips)
      this.thigh_L.push(p.thigh_L)
      this.thigh_R.push(p.thigh_R)
      this.calf_L.push(p.calf_L)
      this.calf_R.push(p.calf_R)
      this.date.push(this.utility.FormattedDate(p.date))
    })
  }

  feedGirthsChartData() {

    let objectToPushd: ChartDataModelClass
    let arrayChartDataSet: ChartDataSets[] = []

    objectToPushd = new ChartDataModelClass(this.weight, "Weight", "weigthAxes", false);
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.neck, "Neck", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.chest, "Chest", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.bicep_L, "Bicep left", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.bicep_R, "bicep right", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.bicep_L_Relax, "bicep left relaxed", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.bicep_R_Relax, "bicep right relaxed", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.forearm_L, "Forearm left", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.forearm_R, "Forearm right", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.wrist, "Wrist", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.waist, "Waist", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.hips, "Hips", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.thigh_L, "Thigh left", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.thigh_R, "thigh right", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.calf_L, "calf left", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.calf_R, "calf right", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    this.lineChartLabels = this.date
    return {
      arrayChartDataSet
    }
  }
  //Chart-Object

  chestSkinfold = []
  subscapularSkinfold = []
  midaxillarySkinfold = []
  tricepsSkinfold = []
  suprailiacSkinfold = []
  abdominalSkinfold = []
  thighSkinfold = []
  bicepSkinfold = []
  skinfoldXaxisLabel = []
  weightSkinfold = []
  sum = []

  createSkinfoldsArrayForCharts(arraOfskinfold: CaliperForDB[]) {
    this.chestSkinfold = []
    this.subscapularSkinfold = []
    this.midaxillarySkinfold = []
    this.tricepsSkinfold = []
    this.suprailiacSkinfold = []
    this.abdominalSkinfold = []
    this.thighSkinfold = []
    this.bicepSkinfold = []
    this.weightSkinfold = []
    this.skinfoldXaxisLabel = []
    this.sum = []
    let localSkinfoldObject = [...arraOfskinfold].sort((d1, d2) => new Date(d1.metadata.date).getTime() - new Date(d2.metadata.date).getTime())

    localSkinfoldObject.map(p => {
      let sumPartial: number = 0

      this.weightSkinfold.push(p.metadata.weight)
      let c: number
      p.fold.Chest != undefined ? c = p.fold.Chest : c = 0
      this.chestSkinfold.push(c)
      sumPartial += c
      let s: number
      p.fold.Subscapular != undefined ? s = p.fold.Subscapular : s = 0
      this.subscapularSkinfold.push(s)
      sumPartial += s
      let m: number
      p.fold.Midaxillary != undefined ? m = p.fold.Midaxillary : m = 0
      this.midaxillarySkinfold.push(m)
      sumPartial += m
      let t: number
      p.fold.Triceps != undefined ? t = p.fold.Triceps : t = 0
      this.tricepsSkinfold.push(t)
      sumPartial += t
      let su: number
      p.fold.Suprailiac != undefined ? su = p.fold.Suprailiac : su = 0
      this.suprailiacSkinfold.push(su)
      sumPartial += su
      let a: number
      p.fold.Abdominal != undefined ? a = p.fold.Abdominal : a = 0
      this.abdominalSkinfold.push(a)
      sumPartial += a
      let ti: number
      p.fold.Thigh != undefined ? ti = p.fold.Thigh : ti = 0
      this.thighSkinfold.push(ti)
      sumPartial += ti
      let bi: number
      p.fold.Bicep != undefined ? bi = p.fold.Bicep : bi = 0
      this.bicepSkinfold.push(bi)
      sumPartial += bi

      this.sum.push(sumPartial)
      let u = []
      let d = this.utility.FormattedDate(p.metadata.date)
      u.push(d)
      switch (true) {
        case p.metadata.method == "jackson & Polloc 7 point Man": u.push("Jackson & Polloc 7 point"); break
        case p.metadata.method == "jackson & Polloc 7 point Man": u.push("Jackson & Polloc 7 point"); break
        case p.metadata.method == "jackson & Polloc 3 point Man": u.push("Jackson & Polloc 3 point"); break
        case p.metadata.method == "jackson & Polloc 3 point Woman": u.push("Jackson & Polloc 3 point"); break
        case p.metadata.method == "Sloan - Men 2 point": u.push("Sloan"); break
        case p.metadata.method == "Sloan - Woman 2 point": u.push("Sloan"); break
        case p.metadata.method == "Durnin & Womersley Man": u.push("Durnin & Womersley"); break
        case p.metadata.method == "Durnin & Womersley Woman": u.push("Durnin & Womersley"); break
      }
      let ag = p.metadata.age

      u.push(ag)

      this.skinfoldXaxisLabel.push(u)
    })
    let maxSkinfold = Math.max(...this.sum) + 5
    return maxSkinfold
  }
  createSkinfoldsArrayForCharts2(arraOfskinfold: CaliperForDB[]) {
    this.chestSkinfold = []
    this.subscapularSkinfold = []
    this.midaxillarySkinfold = []
    this.tricepsSkinfold = []
    this.suprailiacSkinfold = []
    this.abdominalSkinfold = []
    this.thighSkinfold = []
    this.bicepSkinfold = []
    this.weightSkinfold = []
    this.skinfoldXaxisLabel = []
    this.sum = []
    let localSkinfoldObject = [...arraOfskinfold].sort((d1, d2) => new Date(d1.metadata.date).getTime() - new Date(d2.metadata.date).getTime())

    localSkinfoldObject.map(p => {
      let sumPartial: number = 0

      this.weightSkinfold.push(p.metadata.weight)
      let c: number
      p.fold.Chest != undefined ? c = p.fold.Chest : c = 0
      this.chestSkinfold.push(c)
      sumPartial += c
      let s: number
      p.fold.Subscapular != undefined ? s = p.fold.Subscapular : s = 0
      this.subscapularSkinfold.push(s)
      sumPartial += s
      let m: number
      p.fold.Midaxillary != undefined ? m = p.fold.Midaxillary : m = 0
      this.midaxillarySkinfold.push(m)
      sumPartial += m
      let t: number
      p.fold.Triceps != undefined ? t = p.fold.Triceps : t = 0
      this.tricepsSkinfold.push(t)
      sumPartial += t
      let su: number
      p.fold.Suprailiac != undefined ? su = p.fold.Suprailiac : su = 0
      this.suprailiacSkinfold.push(su)
      sumPartial += su
      let a: number
      p.fold.Abdominal != undefined ? a = p.fold.Abdominal : a = 0
      this.abdominalSkinfold.push(a)
      sumPartial += a
      let ti: number
      p.fold.Thigh != undefined ? ti = p.fold.Thigh : ti = 0
      this.thighSkinfold.push(ti)
      sumPartial += ti
      let bi: number
      p.fold.Bicep != undefined ? bi = p.fold.Bicep : bi = 0
      this.bicepSkinfold.push(bi)
      sumPartial += bi

      this.sum.push(sumPartial)
      let u = []
      let d = this.utility.FormattedDate(p.metadata.date)
      u.push(d)
      switch (true) {
        case p.metadata.method == "jackson & Polloc 7 point Man": u.push("Jackson & Polloc 7 point"); break
        case p.metadata.method == "jackson & Polloc 7 point Man": u.push("Jackson & Polloc 7 point"); break
        case p.metadata.method == "jackson & Polloc 3 point Man": u.push("Jackson & Polloc 3 point"); break
        case p.metadata.method == "jackson & Polloc 3 point Woman": u.push("Jackson & Polloc 3 point"); break
        case p.metadata.method == "Sloan - Men 2 point": u.push("Sloan"); break
        case p.metadata.method == "Sloan - Woman 2 point": u.push("Sloan"); break
        case p.metadata.method == "Durnin & Womersley Man": u.push("Durnin & Womersley"); break
        case p.metadata.method == "Durnin & Womersley Woman": u.push("Durnin & Womersley"); break
      }
      let ag = p.metadata.age

      u.push(ag)

      this.skinfoldXaxisLabel.push(u)
    })

  }

  feedSkinfoldsChartData() {

    let objectToPushd: ChartDataModelClass
    let arrayChartDataSet: ChartDataSets[] = []

    objectToPushd = new ChartDataModelClass(this.weightSkinfold, "Weight", "weigthAxes", false);
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.sum, "Skinfolds sum", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.chestSkinfold, "Chest", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.subscapularSkinfold, "Subscapular", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.midaxillarySkinfold, "Midaxillary", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.tricepsSkinfold, "Tricep", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.suprailiacSkinfold, "Suprailiac", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.abdominalSkinfold, "Abdominal", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.thighSkinfold, "Thigh", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(this.bicepSkinfold, "Bicep", "girthAxes", true)
    arrayChartDataSet.push(objectToPushd)
    this.lineChartMultiLabels = this.skinfoldXaxisLabel

    return {
      arrayChartDataSet
    }
  }

  //LINE CHART

  lineChartLabels: Label[]
  lineChartMultiLabels: Label[][]
  lineChartOptions: ChartOptions
  lineChartLegend = true
  lineChartType: ChartType = 'line'
  lineChartOption(yAxesIdLeft: string, yAxesIdRight: string, yAxesMaxScale: number) {
    this.lineChartOptions = {
      responsive: true,
      animation: {
        animateRotate: true,
        animateScale: true
      },
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
        }
      },
      plugins: {
        datalabels: {
          display: false
        }
      },
      elements: {
        line: { tension: 0.2, borderWidth: 1 },
        point: { pointStyle: 'circle' }
      },
      scales: {

        yAxes: [{
          id: "girthAxes",
          display: true,
          position: 'left',
          type: "linear",

          scaleLabel: {
            display: true,
            labelString: yAxesIdLeft

          },
          ticks: {
            max: yAxesMaxScale,
            beginAtZero: true,
          },
        }, {
          id: "weigthAxes",
          display: true,
          position: "right",
          type: "linear",
          scaleLabel: {
            display: true,
            labelString: yAxesIdRight
          },
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: false
          },
        }]
      }
    }
    return this.lineChartOptions
  }

  //PIE CHART

  pieDataChart(fatMass: number, leanMass: number,) {
    let pieDataChart: number[] = [fatMass, leanMass]
    return pieDataChart
  }

  pieChartLabels: Label[] = [['Fat', 'Maas'], ['Lean', 'Mass']]
  pieChartType: ChartType = 'pie'
  pieChartLegend: boolean = true
  pieChartPlugins: ChartPluginsOptions = [pluginDataLabels];
  pieChartColors = [
    {
      backgroundColor: ["orangered", "lightskyblue",],
      borderColor: "white",
      borderWidth: 1
    },
  ]

  pieChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 1.2,
    animation: {
      animateRotate: true,
      animateScale: true
    },

    legend: {
      display: true,
      position: 'top',
      labels: {
        usePointStyle: true,
        fontColor: 'white'
      }
    },
    elements: {
      point: { pointStyle: 'circle' }
    },
    tooltips: {
      backgroundColor: 'white',
      borderWidth: 0,
      callbacks: {
        labelTextColor: function (tooltipItem, chart) {
          return "black";
        },
      }
    },
    plugins: {
      datalabels: {
        color: 'white',
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;

        },
      },
    },

  }

  //BAR CHART

  barChartData(data: any[], label: string) {

    let barChartData: ChartDataSets[] = [
      {
        data: data,
        label: '',
        backgroundColor: ["lightblue",
          "lightskyblue",
          "chartreuse",
          "darkseagreen",
          "orange",
          "tomato",
          "orangered",]
      }
    ]
    return barChartData
  }

  barChartLabels(label: Label[]) {

    let barChartLabels: Label[] = label

    return barChartLabels
  }

  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [pluginDataLabels];


  barChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 1.2,
    animation: {
      animateRotate: true,
      animateScale: true
    },
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: "mm"
        }
      }],
    },

    plugins: {

      datalabels: {
        anchor: 'end',
        align: 'end',

      }
    },
    legend: {
      display: true
    }
  }

}

export class ChartDataModelClass implements ChartDataSets {
  data: any[]
  label: string
  yAxisID: string
  hidden: boolean

  constructor(data: any[], label: string, yAxisID: string, hidden: boolean) {
    this.data = data
    this.label = label
    this.yAxisID = yAxisID,
      this.hidden = hidden
  }
}
export class BarChartDataModelClass implements ChartDataSets {
  data: any[]
  label: string

  constructor(data: any[], label: string) {
    this.data = data
    this.label = label
  }
}

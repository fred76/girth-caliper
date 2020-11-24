
import { SkinfoldsForDB } from '../interface-model/skinfold.model';
import { Girths } from './../interface-model/girths.model';
import { Utility } from './../Utility/utility';
import { Injectable } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType, ChartPluginsOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Options } from 'chartjs-plugin-datalabels/types/options';


@Injectable({
  providedIn: 'root'
})

export class ChartService {

  constructor(private utility: Utility) { }


  girthLineChartData(arraOfGirths: Girths[]) {
    let weight = []
    let neck = []
    let chest = []
    let bicep_L = []
    let bicep_R = []
    let bicep_L_Relax = []
    let bicep_R_Relax = []
    let forearm_L = []
    let forearm_R = []
    let wrist = []
    let waist = []
    let hips = []
    let thigh_L = []
    let thigh_R = []
    let calf_L = []
    let calf_R = []
    let date = []
    let localGirthObject = [...arraOfGirths].sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime())
    localGirthObject.map(p => {
      weight.push(p.weight)
      neck.push(p.neck)
      chest.push(p.chest)
      bicep_L.push(p.bicep_L)
      bicep_R.push(p.bicep_R)
      bicep_L_Relax.push(p.bicep_L_Relax)
      bicep_R_Relax.push(p.bicep_R_Relax)
      forearm_L.push(p.forearm_L)
      forearm_R.push(p.forearm_R)
      wrist.push(p.wrist)
      waist.push(p.waist)
      hips.push(p.hips)
      thigh_L.push(p.thigh_L)
      thigh_R.push(p.thigh_R)
      calf_L.push(p.calf_L)
      calf_R.push(p.calf_R)
      date.push(this.utility.FormattedDate(p.date))
    })

    let objectToPushd: ChartDataModelClass
    let arrayChartDataSet: ChartDataSets[] = []

    objectToPushd = new ChartDataModelClass(weight, "Weight", "yAxesKg", false, "line", true);
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(neck, "Neck", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(chest, "Chest", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(bicep_L, "Bicep left", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(bicep_R, "bicep right", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(bicep_L_Relax, "bicep left relaxed", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(bicep_R_Relax, "bicep right relaxed", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(forearm_L, "Forearm left", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(forearm_R, "Forearm right", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(wrist, "Wrist", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(waist, "Waist", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(hips, "Hips", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(thigh_L, "Thigh left", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(thigh_R, "thigh right", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(calf_L, "calf left", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(calf_R, "calf right", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    this.lineChartLabels = date

    let maxWeight = Math.max(...weight) + 20
    return { arrayChartDataSet, maxWeight }
  }
  //Chart-Object

  skinfoldLineChartData(arraOfskinfold: SkinfoldsForDB[]) {

    let localSkinfoldObject = [...arraOfskinfold].sort((d1, d2) => new Date(d1.metadata.date).getTime() - new Date(d2.metadata.date).getTime())
    let chestSkinfold = []
    let subscapularSkinfold = []
    let midaxillarySkinfold = []
    let tricepsSkinfold = []
    let suprailiacSkinfold = []
    let abdominalSkinfold = []
    let thighSkinfold = []
    let bicepSkinfold = []
    let weightSkinfold = []
    let skinfoldXaxisLabel = []
    let sum = []
    let fatMass = []
    let leanMass = []
    let bodtDensity = []

    localSkinfoldObject.map(p => {

      weightSkinfold.push(p.metadata.weight)
      let c: number
      p.fold.Chest != undefined ? c = p.fold.Chest : c = 0
      chestSkinfold.push(c)
      let s: number
      p.fold.Subscapular != undefined ? s = p.fold.Subscapular : s = 0
      subscapularSkinfold.push(s)
      let m: number
      p.fold.Midaxillary != undefined ? m = p.fold.Midaxillary : m = 0
      midaxillarySkinfold.push(m)
      let t: number
      p.fold.Triceps != undefined ? t = p.fold.Triceps : t = 0
      tricepsSkinfold.push(t)
      let su: number
      p.fold.Suprailiac != undefined ? su = p.fold.Suprailiac : su = 0
      suprailiacSkinfold.push(su)
      let a: number
      p.fold.Abdominal != undefined ? a = p.fold.Abdominal : a = 0
      abdominalSkinfold.push(a)
      let ti: number
      p.fold.Thigh != undefined ? ti = p.fold.Thigh : ti = 0
      thighSkinfold.push(ti)
      let bi: number
      p.fold.Bicep != undefined ? bi = p.fold.Bicep : bi = 0
      bicepSkinfold.push(bi)

      sum.push(p.bodyResult.skinfoldsSum)

      fatMass.push(p.bodyResult.fatMass)
      leanMass.push(p.bodyResult.leanMass)
      bodtDensity.push(p.bodyResult.bodyDensity)

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

      skinfoldXaxisLabel.push(u)
    })
    let skinfoldToPush: ChartDataModelClass
    let skinfoldChartDataSet: ChartDataSets[] = []

    let bodyCompostitionDataSet: ChartDataSets[] = []
    let lineChartToTpush: ChartDataModelClass

    skinfoldToPush = new ChartDataModelClass(weightSkinfold, "Weight", "yAxesKg", false, "line", true);
    skinfoldChartDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(sum, "Skinfolds sum", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(chestSkinfold, "Chest", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(subscapularSkinfold, "Subscapular", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(midaxillarySkinfold, "Midaxillary", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(tricepsSkinfold, "Tricep", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(suprailiacSkinfold, "Suprailiac", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(abdominalSkinfold, "Abdominal", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(thighSkinfold, "Thigh", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(bicepSkinfold, "Bicep", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)

    let maxSkinfold = Math.max(...sum) + 5
    let maxWeight = Math.max(...weightSkinfold) + 20
    let maxBodyDensity = Math.max(...bodtDensity) + 0.05

    lineChartToTpush = new ChartDataModelClassWeight(bodtDensity, "Body Density g/cc", "yAxesGCC", false, "line", false, 3, "red")
    bodyCompostitionDataSet.push(lineChartToTpush)
    let chartDataModelClassWeight = new ChartDataModelClassWeight(weightSkinfold, "Weight", "yAxesBodyWeight", false, "line", false, 2, "red");
    bodyCompostitionDataSet.push(chartDataModelClassWeight)
    let chartDataModelClassWeight1 = new ChartDataModelClassWeight(leanMass, "Lean mass", "yAxesKg", false, "line", true, 1, "lightskyblue")
    bodyCompostitionDataSet.push(chartDataModelClassWeight1)
    let chartDataModelClassWeight2 = new ChartDataModelClassWeight(fatMass, "fat mass", "yAxesKg", false, "line", true, 1, "orangered")
    bodyCompostitionDataSet.push(chartDataModelClassWeight2)
    let chartDataModelClassBar = new ChartDataModelClassBar(sum, "Skinfolds sum", "yAxesMM", false, "bar", 20, "palevioletred")
    bodyCompostitionDataSet.push(chartDataModelClassBar)

    return { skinfoldChartDataSet, skinfoldXaxisLabel, maxSkinfold, bodyCompostitionDataSet, maxWeight, maxBodyDensity }

  }

  //DUAL CHART

  dualChartOptions: ChartOptions

  dualChartOption(yAxesIdLeftMaas: string, yAxesIdRightBDensity: string, yAxesIdSkinfoldsSum: string, stacked: boolean, sumMax: number, weightScale: number, bodyDensityMax: number) {
    let stacked1 = true
    this.dualChartOptions = {
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
      elements: {
        line: { tension: 0.2, borderWidth: 1 },
        point: { pointStyle: 'circle' }
      },
      plugins: {
        datalabels: {
          display: false
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' }
          }
        ],
        yAxes: [
          {
            id: "yAxesMM", display: false, position: "right", type: "linear",
            scaleLabel: { display: true, labelString: yAxesIdSkinfoldsSum, fontColor: 'rgba(255, 255, 255, 0.5)' },
            ticks: { max: sumMax, beginAtZero: true },
            gridLines: { display: false }
          },
          {
            id: "yAxesBodyWeight", display: false, position: 'left', type: "linear",
            scaleLabel: { display: false, fontColor: 'rgba(255, 255, 255, 0.5)' },
            ticks: { max: weightScale, beginAtZero: true },
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' }
          },
          {
            id: "yAxesKg", stacked: stacked1, display: true, position: 'left', type: "linear",
            scaleLabel: { display: true, labelString: yAxesIdLeftMaas, fontColor: 'rgba(255, 255, 255, 0.5)' },
            ticks: { max: weightScale, beginAtZero: true },
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' }
          },
          {
            id: "yAxesGCC", display: true, position: "right", type: "linear",
            scaleLabel: { display: true, labelString: yAxesIdRightBDensity, fontColor: 'rgba(255, 255, 255, 0.5)' },
            ticks:
            {
              maxTicksLimit: 5,
              max: bodyDensityMax,
              stepSize: 0.01,
              beginAtZero: false
            },
            gridLines: { display: false }
          }
        ]
      }

    }
    return this.dualChartOptions
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
      animation: { animateRotate: true, animateScale: true },
      legend: {
        display: true,
        labels: { usePointStyle: true }
      },
      plugins: {
        datalabels: { display: false }
      },
      elements: {
        line: { tension: 0.2, borderWidth: 1 },
        point: { pointStyle: 'circle' }
      },
      scales: {
        xAxes: [
          {
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' }
          }
        ],
        yAxes: [
          {
            id: "yAxesMm", display: true, position: 'left', type: "linear",
            scaleLabel: { display: true, labelString: yAxesIdLeft, fontColor: 'rgba(255, 255, 255, 0.5)' },
            ticks: { max: yAxesMaxScale, beginAtZero: true },
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' }

          },
          {
            id: "yAxesKg", display: true, position: "right", type: "linear",
            scaleLabel: { display: true, labelString: yAxesIdRight, fontColor: 'rgba(255, 255, 255, 0.5)' },
            ticks: { beginAtZero: true },
            gridLines: { display: false, color: 'rgba(255, 255, 255, 0.1)' },
          }
        ]
      }
    }
    return this.lineChartOptions
  }

  //PIE CHART

  pieDataChart(fatMass: number, leanMass: number,) {
    let pieDataChart: number[] = [fatMass, leanMass]
    return pieDataChart
  }

  pieChartLabels: Label[] = [['Fat maas (Kg)'], ['Lean mass (Kg)']]
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
    animation: { animateRotate: true, animateScale: true },
    legend: {
      display: true, position: 'top',
      labels: { usePointStyle: true, fontColor: 'white' }
    },
    elements: { point: { pointStyle: 'circle' } },
    tooltips: {
      backgroundColor: 'white', borderWidth: 0,
      callbacks: { labelTextColor: function (tooltipItem, chart) { return "black" } }
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
          "orangered"],
        type: 'bar'

      }
    ]
    return barChartData
  }

  barChartLabels(label: Label[]) {

    let barChartLabels: Label[] = label

    return barChartLabels
  }

  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [pluginDataLabels];


  barChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 1.2,
    animation: {
      animateRotate: true,
      animateScale: true
    },
    scales: {
      xAxes: [
        {
          gridLines: { color: 'rgba(255, 255, 255, 0.1)' }
        }
      ],
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: "Skinfolds ( mm )"
        },
        gridLines: { color: 'rgba(255, 255, 255, 0.1)' }
      }],
    },
    plugins: {
      datalabels: {
        anchor: 'center',
        align: 'end',

      }
    },
    legend: {
      display: false
    }
  }

}

export class ChartDataModelClass implements ChartDataSets {
  data: any[]
  label: string
  yAxisID: string
  hidden: boolean
  type: string
  fill: boolean

  constructor(data: any[], label: string, yAxisID: string, hidden: boolean, type: string, fill: boolean) {
    this.data = data
    this.label = label
    this.yAxisID = yAxisID
    this.hidden = hidden
    this.type = type
    this.fill = fill

  }
}

export class ChartDataModelClassBar implements ChartDataSets {
  data: any[]
  label: string
  yAxisID: string
  hidden: boolean
  type: string
  barThickness: number
  datalabels: Options
  backgroundColor: string

  constructor(data: any[], label: string, yAxisID: string, hidden: boolean, type: string, barThickness: number, backgroundColor: string) {
    this.data = data
    this.label = label
    this.yAxisID = yAxisID
    this.hidden = hidden
    this.type = type
    this.barThickness = barThickness
    this.backgroundColor = backgroundColor
    this.datalabels = {
      align: 'center',
      anchor: 'center',
      display: true,
    }
  }
}

export class ChartDataModelClassWeight implements ChartDataSets {
  data: any[]
  label: string
  yAxisID: string
  hidden: boolean
  type: string
  fill: boolean
  borderWidth: number
  backgroundColor: string

  constructor(data: any[], label: string, yAxisID: string, hidden: boolean, type: string, fill: boolean, borderWidth: number, backgroundColor: string) {
    this.data = data
    this.label = label
    this.yAxisID = yAxisID
    this.hidden = hidden
    this.type = type
    this.fill = fill
    this.borderWidth = borderWidth
    this.backgroundColor = backgroundColor

  }
}



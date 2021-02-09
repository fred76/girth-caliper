import { SkinfoldsForDB } from './../../interface-model/skinfold.model';
import { Girths } from './../../interface-model/girths.model';
import { Utility } from '../../Utility/utility';
import { Injectable } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType, ChartPluginsOptions, Chart, ChartData } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Options } from 'chartjs-plugin-datalabels/types/options';
import 'chartjs-plugin-colorschemes';
import * as moment from 'moment';

@Injectable()
export class ChartFeederService {

  constructor(private utility: Utility) { }

  skinfoldsArray: SkinfoldsForDB[]
  girthsArray: Girths[]

  girthsDataSet(girthsArray: Girths[]) {

    let girthsOrdered = [...girthsArray].sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime())

    let allGirths = []
    let allWeight = []
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
    let dataSet = []

    girthsOrdered.map(g => {

      date.push(this.utility.FormattedDate(g.date))
      let d = this.utility.FormattedDate(g.date)

      weight.push({ x: d, y: g.weight }), allWeight.push(g.weight)
      neck.push({ x: d, y: g.neck }), allGirths.push(g.neck)
      chest.push({ x: d, y: g.chest }), allGirths.push(g.chest)
      bicep_L.push({ x: d, y: g.bicep_L }), allGirths.push(g.bicep_L)
      bicep_R.push({ x: d, y: g.bicep_R }), allGirths.push(g.bicep_R)
      bicep_L_Relax.push({ x: d, y: g.bicep_L_Relax }), allGirths.push(g.bicep_L_Relax)
      bicep_R_Relax.push({ x: d, y: g.bicep_R_Relax }), allGirths.push(g.bicep_R_Relax)
      forearm_L.push({ x: d, y: g.forearm_L }), allGirths.push(g.forearm_L)
      forearm_R.push({ x: d, y: g.forearm_R }), allGirths.push(g.forearm_R)
      wrist.push({ x: d, y: g.wrist }), allGirths.push(g.wrist)
      waist.push({ x: d, y: g.waist }), allGirths.push(g.waist)
      hips.push({ x: d, y: g.hips }), allGirths.push(g.hips)
      thigh_L.push({ x: d, y: g.thigh_L }), allGirths.push(g.thigh_L)
      thigh_R.push({ x: d, y: g.thigh_R }), allGirths.push(g.thigh_R)
      calf_L.push({ x: d, y: g.calf_L }), allGirths.push(g.calf_L)
      calf_R.push({ x: d, y: g.calf_R }), allGirths.push(g.calf_R)
    })

    dataSet.push({
      data: weight,
      label: "Weight",
      yAxisID: "yAxesKg",
      hidden: false,
      fill: true
    })
    dataSet.push({
      data: neck,
      label: "Neck",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: chest,
      label: "Chest",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: bicep_L,
      label: "Bicep left",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: bicep_R,
      label: "bicep left relaxed",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: bicep_L_Relax,
      label: "Bicep right relaxed",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: bicep_R_Relax,
      label: "Bicep right",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: forearm_L,
      label: "Forearm left",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: forearm_R,
      label: "Forearm right",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: wrist,
      label: "Wrist",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: waist,
      label: "Waist",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: hips,
      label: "Hips",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: thigh_L,
      label: "Thigh Left",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: thigh_R,
      label: "Thigh right",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: calf_L,
      label: "Calf right",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSet.push({
      data: calf_R,
      label: "Calf right",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })

    let maxGirth = [...allGirths]
    let maxWeight = [...allWeight]
    let maxGirthForScale = Math.max(...maxGirth) + 20
    let maxWeightForScale = Math.max(...maxWeight) + 20

    return { dataSet, date, maxGirthForScale, maxWeightForScale }
  }

  skinfoldsDataSet(skinfoldsArray: SkinfoldsForDB[],) {

    let skinfoldsOrdered = [...skinfoldsArray].sort((d1, d2) => new Date(d1.metadata.date).getTime() - new Date(d2.metadata.date).getTime())

    let allFolds = []
    let allWeight = []
    let allSum = []
    let allBodyDensity = []
    let chestSkinfold = []
    let subscapularSkinfold = []
    let midaxillarySkinfold = []
    let tricepsSkinfold = []
    let suprailiacSkinfold = []
    let abdominalSkinfold = []
    let thighSkinfold = []
    let bicepSkinfold = []
    let weightSkinfold = []
    let sum = []
    let fatMass = []
    let leanMass = []
    let bodtDensity = []
    let date = []
    let method = []
    let age = []
    let dataSetFolds = []
    let dataSetBodyResult = []

    skinfoldsOrdered.map(s => {

      date.push(this.utility.FormattedDate(s.metadata.date))
      let d = this.utility.FormattedDate(s.metadata.date)
      method.push(s.metadata.method)
      age.push(s.metadata.age)

      weightSkinfold.push({ x: d, y: s.metadata.weight }), allWeight.push(s.metadata.weight)
      s.fold.Chest != undefined ? chestSkinfold.push({ x: d, y: s.fold.Chest }) : null, allFolds.push(s.fold.Chest)
      s.fold.Subscapular != undefined ? subscapularSkinfold.push({ x: d, y: s.fold.Subscapular }) : null, allFolds.push(s.fold.Chest)
      s.fold.Midaxillary != undefined ? midaxillarySkinfold.push({ x: d, y: s.fold.Midaxillary }) : null, allFolds.push(s.fold.Midaxillary)
      s.fold.Triceps != undefined ? tricepsSkinfold.push({ x: d, y: s.fold.Triceps }) : null, allFolds.push(s.fold.Triceps)
      s.fold.Bicep != undefined ? bicepSkinfold.push({ x: d, y: s.fold.Bicep }) : null, allFolds.push(s.fold.Bicep)
      s.fold.Suprailiac != undefined ? suprailiacSkinfold.push({ x: d, y: s.fold.Suprailiac }) : null, allFolds.push(s.fold.Suprailiac)
      s.fold.Abdominal != undefined ? abdominalSkinfold.push({ x: d, y: s.fold.Abdominal }) : null, allFolds.push(s.fold.Abdominal)
      s.fold.Thigh != undefined ? thighSkinfold.push({ x: d, y: s.fold.Thigh }) : null, allFolds.push(s.fold.Thigh)
      sum.push({ x: d, y: s.bodyResult.skinfoldsSum }), allSum.push(s.bodyResult.skinfoldsSum)
      fatMass.push({ x: d, y: s.bodyResult.fatMass })
      leanMass.push({ x: d, y: s.bodyResult.leanMass })
      bodtDensity.push({ x: d, y: s.bodyResult.bodyDensity }), allBodyDensity.push(s.bodyResult.bodyDensity)

    })

    dataSetFolds.push({
      data: weightSkinfold,
      label: "Weight",
      yAxisID: "yAxesKg",
      hidden: false,
      fill: true
    })
    dataSetFolds.push({
      data: chestSkinfold,
      label: "Chest",
      yAxisID: "yAxesMm",
      hidden: false,
      fill: true
    })
    dataSetFolds.push({
      data: subscapularSkinfold,
      label: "Subscapular",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSetFolds.push({
      data: midaxillarySkinfold,
      label: "Midaxillary",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSetFolds.push({
      data: tricepsSkinfold,
      label: "Tricep",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSetFolds.push({
      data: bicepSkinfold,
      label: "Bicep",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSetFolds.push({
      data: suprailiacSkinfold,
      label: "Suprailiac",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSetFolds.push({
      data: abdominalSkinfold,
      label: "Abdominal",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true

    })
    dataSetFolds.push({
      data: thighSkinfold,
      label: "Thigh",
      yAxisID: "yAxesMm",
      hidden: true,
      fill: true
    })
    dataSetBodyResult.push({
      data: weightSkinfold,
      label: "Weight",
      yAxisID: "yAxesBodyWeight",
      hidden: false,
      fill: true
    })
    dataSetBodyResult.push({
      data: sum,
      label: "Skinfolds sum",
      yAxisID: "yAxesMM",
      hidden: true,
      fill: true
    })
    dataSetBodyResult.push({
      data: leanMass,
      label: "Lean mass",
      yAxisID: "yAxesKg",
      hidden: true,
      fill: true
    })
    dataSetBodyResult.push({
      data: fatMass,
      label: "Fat mass",
      yAxisID: "yAxesKg",
      hidden: true,
      fill: true
    })
    dataSetBodyResult.push({
      data: bodtDensity,
      label: "Body Density g/cc",
      yAxisID: "yAxesGCC",
      hidden: true,
      fill: true
    })

    let maxFolds = allFolds.filter(Number)
    let maxWeight = [...allWeight]
    let maxBodyDensities = [...allBodyDensity]
    let maxSums = [...allSum]

    let maxFoldForScale = Math.max(...maxFolds) + 20
    let maxWeightForScale = Math.max(...maxWeight) + 20
    let maxBodyDensityForScale = Math.max(...maxBodyDensities)
    let maxSumForScale = Math.max(...maxSums)

    return { dataSetFolds, dataSetBodyResult, date, maxFoldForScale, maxWeightForScale, maxBodyDensityForScale, maxSumForScale, method, age }
  }

  skinfoldsOverGirthsDataSet(skinfoldsArray: SkinfoldsForDB[], girthsArray: Girths[]) {

    let dateSkinfolds = []
    let dateGirths = []

    let chestDataSetSkinfolds = []
    let subscapularDataSetSkinfolds = []
    let midaxillaryDataSetSkinfolds = []
    let tricepDataSetSkinfolds = []
    let bicepDataSetSkinfolds = []
    let suprailiacDataSetSkinfolds = []
    let abdominalDataSetSkinfolds = []
    let thighDataSetSkinfolds = []

    let chestDataSetGirths = []
    let bicepDataSetGirths = []
    let bicepRelaxedDataSetGirths = []
    let abdominalDataSetGirths = []
    let thighDataSetGirths = []

    let allFolds = []
    let allGirths = []
    let chestDataSet = []
    let armDataSet = []
    let abdominalDataSet = []
    let thighDataSet = []

    skinfoldsArray.map(s => {

      dateSkinfolds.push(this.utility.FormattedDate(s.metadata.date))
      let d = this.utility.FormattedDate(s.metadata.date)

      s.fold.Chest != undefined ? chestDataSetSkinfolds.push({ x: d, y: s.fold.Chest }) : null, allFolds.push(s.fold.Chest)
      s.fold.Subscapular != undefined ? subscapularDataSetSkinfolds.push({ x: d, y: s.fold.Subscapular }) : null, allFolds.push(s.fold.Chest)
      s.fold.Midaxillary != undefined ? midaxillaryDataSetSkinfolds.push({ x: d, y: s.fold.Midaxillary }) : null, allFolds.push(s.fold.Midaxillary)
      s.fold.Triceps != undefined ? tricepDataSetSkinfolds.push({ x: d, y: s.fold.Triceps }) : null, allFolds.push(s.fold.Triceps)
      s.fold.Bicep != undefined ? bicepDataSetSkinfolds.push({ x: d, y: s.fold.Bicep }) : null, allFolds.push(s.fold.Bicep)
      s.fold.Suprailiac != undefined ? suprailiacDataSetSkinfolds.push({ x: d, y: s.fold.Suprailiac }) : null, allFolds.push(s.fold.Suprailiac)
      s.fold.Abdominal != undefined ? abdominalDataSetSkinfolds.push({ x: d, y: s.fold.Abdominal }) : null, allFolds.push(s.fold.Abdominal)
      s.fold.Thigh != undefined ? thighDataSetSkinfolds.push({ x: d, y: s.fold.Thigh }) : null, allFolds.push(s.fold.Thigh)
    })

    girthsArray.map(g => {

      dateGirths.push(this.utility.FormattedDate(g.date))
      let d = this.utility.FormattedDate(g.date)

      chestDataSetGirths.push({ x: d, y: g.chest }), allGirths.push(g.chest)
      bicepDataSetGirths.push({ x: d, y: g.bicep_L }), allGirths.push(g.bicep_L)
      bicepRelaxedDataSetGirths.push({ x: d, y: g.bicep_L_Relax }), allGirths.push(g.bicep_L_Relax)
      abdominalDataSetGirths.push({ x: d, y: g.waist }), allGirths.push(g.waist)
      thighDataSetGirths.push({ x: d, y: g.thigh_L }), allGirths.push(g.thigh_L)
    })
    chestDataSet.push({
      data: chestDataSetGirths,
      label: "Chest girths",
      yAxisID: "yAxesMmRight",
      xAxisID: "topAxis",
      hidden: false,
      fill: true
    })
    chestDataSet.push({
      data: chestDataSetSkinfolds,
      label: "Chest skinfolds",
      yAxisID: "yAxesMmLeft",
      xAxisID: "bottomAxis",
      hidden: false,
      fill: true
    })
    chestDataSet.push({
      data: subscapularDataSetSkinfolds,
      label: "Subscapular skinfolds",
      yAxisID: "yAxesMmLeft",
      xAxisID: "bottomAxis",
      hidden: false,
      fill: true
    })
    chestDataSet.push({
      data: midaxillaryDataSetSkinfolds,
      label: "Midaxillary skinfolds",
      yAxisID: "yAxesMmLeft",
      xAxisID: "bottomAxis",
      hidden: false,
      fill: true
    })
    armDataSet.push({
      data: bicepDataSetGirths,
      label: "Bicep girths",
      yAxisID: "yAxesMmRight",
      xAxisID: "topAxis",
      hidden: false,
      fill: true
    })
    armDataSet.push({
      data: bicepRelaxedDataSetGirths,
      label: "Bicep Relaxed girths",
      yAxisID: "yAxesMmRight",
      xAxisID: "topAxis",
      hidden: false,
      fill: true
    })
    armDataSet.push({
      data: tricepDataSetSkinfolds,
      label: "Tricep skinfolds",
      yAxisID: "yAxesMmLeft",
      xAxisID: "bottomAxis",
      hidden: false,
      fill: true
    })
    armDataSet.push({
      data: bicepDataSetSkinfolds,
      label: "Bicep skinfolds",
      yAxisID: "yAxesMmLeft",
      xAxisID: "bottomAxis",
      hidden: false,
      fill: true
    })
    abdominalDataSet.push({
      data: abdominalDataSetGirths,
      label: "Abs girths",
      yAxisID: "yAxesMmRight",
      xAxisID: "topAxis",
      hidden: false,
      fill: true
    })
    abdominalDataSet.push({
      data: abdominalDataSetSkinfolds,
      label: "Abs skinfolds",
      yAxisID: "yAxesMmLeft",
      xAxisID: "bottomAxis",
      hidden: false,
      fill: true
    })
    abdominalDataSet.push({
      data: suprailiacDataSetSkinfolds,
      label: "Suprailiac skinfolds",
      yAxisID: "yAxesMmLeft",
      xAxisID: "bottomAxis",
      hidden: false,
      fill: true
    })
    thighDataSet.push({
      data: thighDataSetGirths,
      label: "Thigh girths",
      yAxisID: "yAxesMmRight",
      xAxisID: "topAxis",
      hidden: false,
      fill: true
    })
    thighDataSet.push({
      data: thighDataSetSkinfolds,
      label: "Thigh skinfolds",
      yAxisID: "yAxesMmLeft",
      xAxisID: "bottomAxis",
      hidden: false,
      fill: true
    })

    let maxGirth = [...allGirths]
    let maxFold = allFolds.filter(Number)
    let maxGirthForScale = Math.max(...maxGirth) + 10
    let maxFoldForScale = Math.max(...maxFold) + 10

    return {
      chestDataSet,
      armDataSet,
      abdominalDataSet,
      thighDataSet,
      maxGirthForScale,
      maxFoldForScale,
      dateSkinfolds,
      dateGirths
    }

  }

  lineChartGirths(t: Girths[]): any {
    let s = this.girthsDataSet(t)
    let Linechart = new Chart('LineChartGirths', {
      type: 'line',
      data: {
        datasets: s.dataSet
      },
      options: this.lineChartGirthOption("Girths ( mm )", "Body weight ( Kg )", s.maxGirthForScale, s.maxWeightForScale, s.date)
    });
    return Linechart
  }

  lineChartSkinfolds(t: SkinfoldsForDB[]) {
    let s = this.skinfoldsDataSet(t)
    let Linechart = new Chart('canvas', {
      type: 'line',
      data: {
        datasets: s.dataSetFolds
      },
      options: this.lineChartSkinfoldsOption("Skinfold ( mm )", "Body weight ( Kg )", s.maxFoldForScale, s.maxWeightForScale, s.date, s.method, s.age)
    });
    return Linechart
  }

  lineChartBodyDensity(t: SkinfoldsForDB[]) {
    let s = this.skinfoldsDataSet(t)
    let Linechart = new Chart('canvas', {
      type: 'line',
      data: {
        datasets: s.dataSetBodyResult
      },
      options: this.lineChartBodyDensityOption("Weight, Lean mass, Fat maas ( Kg )", "Body density ( g/cc )", "Skinfolds sum ( mm )", s.maxSumForScale + 10, s.maxWeightForScale, s.maxBodyDensityForScale + 0.01, s.date)
    });
    return Linechart
  }

  lineChartSkinfoldsOverGirths(s: SkinfoldsForDB[], g: Girths[], id: number) {
    let d = this.skinfoldsOverGirthsDataSet(s, g)
    let dataset = []
    switch (true) {
      case id == 1: dataset = d.armDataSet; break
      case id == 2: dataset = d.chestDataSet; break
      case id == 3: dataset = d.abdominalDataSet; break
      case id == 4: dataset = d.thighDataSet; break
      case id == 5: dataset = d.armDataSet; break
    }
    let Linechart = new Chart('girthsOverSkinfolds', {
      type: 'line',
      data: {
        datasets: dataset
      },
      options: this.lineChartSkinfoldsOverGirthsOptions("Skinfolds ( mm )", "Girths ( mm )", d.maxFoldForScale, d.maxGirthForScale, d.dateSkinfolds, d.dateGirths)
    });
    return Linechart
  }

  lineChartGirthOption(yAxesIdLeft: string, yAxesIdRight: string, yAxesMmMaxScale: number, yAxesKgMaxScale: number, dateLabes) {
    let lineChartOptions: ChartOptions = {
      responsive: true,
      animation: { animateRotate: true, animateScale: true },
      legend: {
        display: true,
        labels: { usePointStyle: true }
      },
      plugins: {
        datalabels: { display: false },
        colorschemes: {
          scheme: "brewer.SetThree12"
        }
      },
      elements: {
        line: { tension: 0.2, borderWidth: 1 },
        point: { pointStyle: 'circle' }
      },

      scales: {
        xAxes: [
          {
            id: "xAxesGirth", display: true, position: 'bottom',
            type: 'time',
            time: {
              unit: 'week',
              displayFormats: { day: 'MM' },
              parser: "DD/MM/YYYY"
            },
            ticks: {
              autoSkip: false,
              source: 'labels',
              callback: function (value, index, values) {
                return moment(value).format('DD/MMM')
              }
            },
            scaleLabel: { display: true, fontColor: 'rgba(255, 255, 255, 0.5)' },
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' },
            labels: dateLabes
          }
        ],
        yAxes: [
          {
            id: "yAxesMm", display: true, position: 'left', type: "linear",
            scaleLabel: { display: true, labelString: yAxesIdLeft, fontColor: 'rgba(255, 255, 255, 0.5)' },
            ticks: { max: yAxesMmMaxScale + 5, beginAtZero: true },
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' }

          },
          {
            id: "yAxesKg", display: true, position: "right", type: "linear",
            scaleLabel: { display: true, labelString: yAxesIdRight, fontColor: 'rgba(255, 255, 255, 0.5)' },
            ticks: { max: yAxesKgMaxScale + 5, beginAtZero: true },
            gridLines: { display: false, color: 'rgba(255, 255, 255, 0.1)' },
          }
        ]
      }
    }
    return lineChartOptions
  }

  lineChartSkinfoldsOption(yAxesIdLeft: string, yAxesIdRight: string, yAxesMmMaxScale: number, yAxesKgMaxScale: number, dateLabes, method, age) {
    let lineChartOptions: ChartOptions = {
      responsive: true,
      animation: { animateRotate: true, animateScale: true },
      legend: {
        display: true,
        labels: { usePointStyle: true }
      },
      plugins: {
        datalabels: { display: false },
        colorschemes: {
          scheme: "brewer.SetThree12"
        }
      },
      elements: {
        line: { tension: 0.2, borderWidth: 1 },
        point: { pointStyle: 'circle' }
      },
      tooltips: {

        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label;
            return label + " - " + method[tooltipItem.index] + " - " + age[tooltipItem.index];
          }
        }
      },
      scales: {
        xAxes: [

          {
            id: "xAxesGirth", display: true, position: 'bottom',
            type: 'time',
            time: {
              unit: 'week',
              displayFormats: { day: 'MM' },
              parser: "DD/MM/YYYY"
            },
            ticks: {
              autoSkip: false,
              source: 'labels',
              callback: function (value, index, values) {
                return moment(value).format('DD/MMM')
              }
            },
            scaleLabel: { display: true, fontColor: 'rgba(255, 255, 255, 0.5)' },
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' },
            labels: dateLabes
          }
        ],
        yAxes: [
          {
            id: "yAxesMm", display: true, position: 'left', type: "linear",
            scaleLabel: { display: true, labelString: yAxesIdLeft, fontColor: 'rgba(255, 255, 255, 0.5)' },
            ticks: { max: yAxesMmMaxScale + 5, beginAtZero: true },
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' }

          },
          {
            id: "yAxesKg", display: true, position: "right", type: "linear",
            scaleLabel: { display: true, labelString: yAxesIdRight, fontColor: 'rgba(255, 255, 255, 0.5)' },
            ticks: { max: yAxesKgMaxScale + 5, beginAtZero: true },
            gridLines: { display: false, color: 'rgba(255, 255, 255, 0.1)' },
          }
        ]
      }
    }
    return lineChartOptions
  }

  lineChartBodyDensityOption(yAxesIdLeftMaas: string, yAxesIdRightBDensity: string, yAxesIdSkinfoldsSum: string, sumMax: number, weightScale: number, bodyDensityMax: number, dateLabes) {
    let stacked1 = true
    let dualChartOptions: ChartOptions = {
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
            id: "xAxesGirth", display: true, position: 'bottom',
            type: 'time',
            time: {
              unit: 'week',
              displayFormats: { day: 'MM' },
              parser: "DD/MM/YYYY"
            },
            ticks: {
              autoSkip: false,
              source: 'labels',
              callback: function (value, index, values) {
                return moment(value).format('DD/MMM')
              }
            },
            scaleLabel: { display: true, fontColor: 'rgba(255, 255, 255, 0.5)' },
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' },
            labels: dateLabes
          }
        ],
        yAxes: [
          {
            id: "yAxesMM", display: false, position: "right", type: "linear",
            scaleLabel: { display: true, labelString: yAxesIdSkinfoldsSum, fontColor: 'rgba(255, 255, 255, 0.5)' },
            ticks: { max: sumMax + 5, beginAtZero: true },
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
    return dualChartOptions
  }

  lineChartSkinfoldsOverGirthsOptions(yAxesIdLeft: string, yAxesIdRight: string, yAxesMmFoldScale: number, yAxesMmGirthScale: number, dateLabesSkinfolds, dateLabesGirths) {
    let lineChartOptions: ChartOptions = {
      responsive: true,
      animation: { animateRotate: true, animateScale: true },
      legend: {
        display: true,
        labels: { usePointStyle: true }
      },
      plugins: {
        datalabels: { display: false },
        colorschemes: {
          scheme: "brewer.SetThree12"
        }
      },
      elements: {
        line: { tension: 0.2, borderWidth: 1 },
        point: { pointStyle: 'circle' }
      },

      scales: {
        xAxes: [
          {
            id: "topAxis", display: true, position: 'top',
            type: 'time',
            time: {
              unit: 'week',
              displayFormats: { day: 'MM' },
              parser: "DD/MM/YYYY"
            },
            ticks: {
              autoSkip: false,
              source: 'labels',
              callback: function (value, index, values) {
                return moment(value).format('DD/MMM')
              }
            },
            scaleLabel: { display: true, fontColor: 'rgba(255, 255, 255, 0.5)' },
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' },
            labels: dateLabesGirths
          },
          {
            id: "bottomAxis", display: true, position: 'bottom',
            type: 'time',
            time: {
              unit: 'week',
              displayFormats: { day: 'MM' },
              parser: "DD/MM/YYYY"
            },
            ticks: {
              autoSkip: false,
              source: 'labels',
              callback: function (value, index, values) {
                return moment(value).format('DD/MMM')
              }
            },
            scaleLabel: { display: true, fontColor: 'rgba(255, 255, 255, 0.5)' },
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' },
            labels: dateLabesSkinfolds
          }
        ],
        yAxes: [
          {
            id: "yAxesMmLeft", display: true, position: 'left', type: "linear",
            scaleLabel: { display: true, labelString: yAxesIdLeft, fontColor: 'rgba(255, 255, 255, 0.5)' },
            ticks: { max: yAxesMmFoldScale + 5, beginAtZero: true },
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' }

          },
          {
            id: "yAxesMmRight", display: true, position: "right", type: "linear",
            scaleLabel: { display: true, labelString: yAxesIdRight, fontColor: 'rgba(255, 255, 255, 0.5)' },
            ticks: { max: yAxesMmGirthScale + 5, beginAtZero: true },
            gridLines: { display: false, color: 'rgba(255, 255, 255, 0.1)' },
          }
        ]
      }
    }
    return lineChartOptions
  }

  pieChart(fatMass: number, leanMass: number,) {
    let pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: [['Fat maas (Kg)'], ['Lean mass (Kg)']],
        datasets: [{
          data: [fatMass, leanMass],
          backgroundColor: ["orangered", "lightskyblue"],
          borderColor: "white",
          borderWidth: 1
        }],

      },
      options: this.pieChartOptions

    });
    return pieChart
  }

  barChart(data: any[], labels: string[]) {
    let pieChart = new Chart('pieChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ["lightblue",
            "lightskyblue",
            "chartreuse",
            "darkseagreen",
            "orange",
            "tomato",
            "orangered"]
        }],

      },
      options: this.barChartOptions

    });
    return pieChart
  }

  pieChartOptions: ChartOptions = {
    responsive: false,
    maintainAspectRatio: true,
    aspectRatio: 1,
    animation: { animateRotate: true, animateScale: true },
    legend: {
      display: false, position: 'top'
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

  // Used inside Card Component

  pieDataChart(fatMass: number, leanMass: number,) {
    let pieDataChart: number[] = [fatMass, leanMass]
    return pieDataChart
  }

  barChartData(data: any[]) {

    let barChartData: ChartDataSets[] = [
      {
        data: data,
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

  pieChartLabels: Label[] = [['Fat maas (Kg)'], ['Lean mass (Kg)']]
  pieChartType: ChartType = 'pie'
  pieChartLegend: boolean = true
  pieChartPlugins: ChartPluginsOptions = [pluginDataLabels];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [pluginDataLabels];

  pieChartColors = [
    {
      backgroundColor: ["orangered", "lightskyblue"],
      borderColor: "white",
      borderWidth: 1
    }]

  pieChartOptionsForCard: ChartOptions = {
    responsive: true,
    animation: { animateRotate: true, animateScale: true },
    legend: {
      display: false, position: 'top'
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





}

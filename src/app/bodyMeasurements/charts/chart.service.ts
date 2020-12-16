import { Girths } from './../../interface-model/girths.model';
import { FireDatabaseService } from 'src/app/Services/fire-database.service';
import { Subscription, BehaviorSubject, Observable, Subject } from 'rxjs';
import { SkinfoldsForDB } from '../../interface-model/skinfold.model';
import { Utility } from '../../Utility/utility';
import { Injectable } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType, ChartPluginsOptions, Chart, ChartData } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Options } from 'chartjs-plugin-datalabels/types/options';
import 'chartjs-plugin-colorschemes';

@Injectable()

export class ChartService {

  constructor(private utility: Utility) {
  }

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
    let lineChartLabels: string[] = []
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
      lineChartLabels.push(this.utility.FormattedDate(p.date))
    })

    let objectToPushd: ChartDataModelClass
    let arrayChartDataSet: ChartDataSets[] = []
    let chestDataSet: ChartDataSets[] = []
    let armDataSet: ChartDataSets[] = []
    let abdominalDataSet: ChartDataSets[] = []
    let thighDataSet: ChartDataSets[] = []

    objectToPushd = new ChartDataModelClass(weight, "Weight", "yAxesKg", false, "line", true);
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(neck, "Neck", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(chest, "Chest", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    chestDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(bicep_L, "Bicep left", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    armDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(bicep_R, "bicep right", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(bicep_L_Relax, "bicep left relaxed", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    armDataSet.push(objectToPushd)
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
    abdominalDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(hips, "Hips", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(thigh_L, "Thigh left", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    thighDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(thigh_R, "thigh right", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(calf_L, "calf left", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    objectToPushd = new ChartDataModelClass(calf_R, "calf right", "yAxesMm", true, "line", true)
    arrayChartDataSet.push(objectToPushd)
    let maxChest = [...chest]
    let maxArm = [...bicep_L, ...bicep_L_Relax,]
    let maxAbs = [...waist]
    let maxThigh = [...thigh_L]
    let maxCalf = [...calf_L]


    let maxChestValue = Math.max(...maxChest)
    let maxArmValue = Math.max(...maxArm)
    let maxAbsValue = Math.max(...maxAbs)
    let maxThighValue = Math.max(...maxThigh)
    let maxCalfValue = Math.max(...maxCalf)

    let maxForAllGirths = Math.max(maxChestValue, maxArmValue, maxAbsValue, maxThighValue, maxCalfValue)

    let maxWeight = Math.max(...weight) + 20
    return {
      arrayChartDataSet, maxWeight, lineChartLabels, chestDataSet, armDataSet, abdominalDataSet, thighDataSet,
      maxChestValue, maxArmValue, maxAbsValue, maxThighValue, maxCalfValue, maxForAllGirths
    }
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
    let skinfoldArryOfDate: string[] = []
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

      let arrayOfDateOfSkinfoldMeasurement = []
      let dateOfMeasurement = this.utility.FormattedDate(p.metadata.date)
      arrayOfDateOfSkinfoldMeasurement.push(dateOfMeasurement)
      skinfoldArryOfDate.push(dateOfMeasurement)
      switch (true) {
        case p.metadata.method == "jackson & Polloc 7 point Man": arrayOfDateOfSkinfoldMeasurement.push("Jackson & Polloc 7 point"); break
        case p.metadata.method == "jackson & Polloc 7 point Man": arrayOfDateOfSkinfoldMeasurement.push("Jackson & Polloc 7 point"); break
        case p.metadata.method == "jackson & Polloc 3 point Man": arrayOfDateOfSkinfoldMeasurement.push("Jackson & Polloc 3 point"); break
        case p.metadata.method == "jackson & Polloc 3 point Woman": arrayOfDateOfSkinfoldMeasurement.push("Jackson & Polloc 3 point"); break
        case p.metadata.method == "Sloan - Men 2 point": arrayOfDateOfSkinfoldMeasurement.push("Sloan"); break
        case p.metadata.method == "Sloan - Woman 2 point": arrayOfDateOfSkinfoldMeasurement.push("Sloan"); break
        case p.metadata.method == "Durnin & Womersley Man": arrayOfDateOfSkinfoldMeasurement.push("Durnin & Womersley"); break
        case p.metadata.method == "Durnin & Womersley Woman": arrayOfDateOfSkinfoldMeasurement.push("Durnin & Womersley"); break
      }
      let ag = p.metadata.age

      arrayOfDateOfSkinfoldMeasurement.push(ag)

      skinfoldXaxisLabel.push(arrayOfDateOfSkinfoldMeasurement)
    })
    let skinfoldToPush: ChartDataModelClass
    let skinfoldChartDataSet: ChartDataSets[] = []

    let lineChartToTpush: ChartDataModelClass
    let bodyCompostitionDataSet: ChartDataSets[] = []
    let chestDataSet: ChartDataSets[] = []
    let armDataSet: ChartDataSets[] = []
    let abdominalDataSet: ChartDataSets[] = []
    let thighDataSet: ChartDataSets[] = []
    skinfoldToPush = new ChartDataModelClass(weightSkinfold, "Weight", "yAxesKg", false, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(sum, "Skinfolds sum", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(chestSkinfold, "Chest", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    chestDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(subscapularSkinfold, "Subscapular", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    chestDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(midaxillarySkinfold, "Midaxillary", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    chestDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(tricepsSkinfold, "Tricep", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    armDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(suprailiacSkinfold, "Suprailiac", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    abdominalDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(abdominalSkinfold, "Abdominal", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    abdominalDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(thighSkinfold, "Thigh", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    thighDataSet.push(skinfoldToPush)
    skinfoldToPush = new ChartDataModelClass(bicepSkinfold, "Bicep", "yAxesMm", true, "line", true)
    skinfoldChartDataSet.push(skinfoldToPush)
    armDataSet.push(skinfoldToPush)

    let maxChest = [...chestSkinfold, ...subscapularSkinfold, ...midaxillarySkinfold]
    let maxArm = [...tricepsSkinfold, ...bicepSkinfold]
    let maxAbs = [...suprailiacSkinfold, ...abdominalSkinfold]
    let maxTight = [...thighSkinfold]
    let maxCalf = []


    let maxChestValue = Math.max(...maxChest)
    let maxArmValue = Math.max(...maxArm)
    let maxAbsValue = Math.max(...maxAbs)
    let maxTightValue = Math.max(...maxTight)
    let maxCalfValue = Math.max(...maxCalf)
    let maxSkinfold = Math.max(...sum)
    let maxWeight = Math.max(...weightSkinfold)
    let maxBodyDensity = Math.max(...bodtDensity)
    let maxForAllSkinfolds = Math.max(maxChestValue, maxArmValue, maxAbsValue, maxTightValue, maxCalfValue)
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

    return {
      weightSkinfold, skinfoldChartDataSet,
      skinfoldXaxisLabel, maxSkinfold,
      bodyCompostitionDataSet, maxWeight, maxBodyDensity,
      chestDataSet, armDataSet, abdominalDataSet, thighDataSet, skinfoldArryOfDate, maxChestValue,
      maxArmValue, maxAbsValue, maxTightValue, maxCalfValue, maxForAllSkinfolds
    }

  }
  calculateDiff(girthDate, skinfoldDate) {
    let girthDateSplit = girthDate.split('/');
    let day = 1000 * 60 * 60 * 24
    let n = girthDateSplit[1] + "/" + girthDateSplit[0] + "/" + girthDateSplit[2]
    let date1 = new Date(n)
    let skinfoldDateSplit = skinfoldDate.split('/');
    let v = skinfoldDateSplit[1] + "/" + skinfoldDateSplit[0] + "/" + skinfoldDateSplit[2]
    let date2 = new Date(v)
    let gapDate = Math.round(((date1.valueOf() - date2.valueOf()) / day));

    let absGapdate = Math.abs(gapDate)

    let dateToManipulate: Date = date1
    if (gapDate > 0) {
      dateToManipulate.setDate(date1.getDate() - (gapDate / 2)).toLocaleString()
    } else {
      dateToManipulate.setDate(date1.getDate() + (gapDate / 2)).toLocaleString()
    }

    let avarageDate = this.utility.FormattedDate(dateToManipulate)

    return { absGapdate, avarageDate }
  }

  compareGirthsSkinfolds(arraOfskinfold: SkinfoldsForDB[], arraOfGirths: Girths[]) {

    let skinfolds = this.skinfoldLineChartData(arraOfskinfold)
    let girths = this.girthLineChartData(arraOfGirths)
    let skinfoldArryOfDate = [...skinfolds.skinfoldArryOfDate].sort((d1, d2) => new Date(d1).getTime() - new Date(d2).getTime())
    let girthsdArryOfDate = [...girths.lineChartLabels].sort((d1, d2) => new Date(d1).getTime() - new Date(d2).getTime())

    let maxChest = Math.max(skinfolds.maxChestValue, girths.maxChestValue)
    let maxArm = Math.max(skinfolds.maxArmValue, girths.maxArmValue)
    let maxAbs = Math.max(skinfolds.maxAbsValue, girths.maxAbsValue)
    let maxThigh = Math.max(skinfolds.maxTightValue, girths.maxThighValue)
    let maxCalf = Math.max(skinfolds.maxCalfValue, girths.maxCalfValue)

    let avarageDateArray = []
    if (skinfoldArryOfDate.length == girthsdArryOfDate.length) {
      skinfoldArryOfDate.map((skinfoldDate, i) => {


        let gapDate = this.calculateDiff(skinfoldDate, girthsdArryOfDate[i])

        avarageDateArray.push(gapDate.avarageDate)

        // if (gapDate.absGapdate > 5) {
        //   new alert("Gap between skinfolds Measurement taken on: " +
        //     skinfoldDate + " and girths measurements taken on: " +
        //     girthsdArryOfDate[i] + " is " + gapDate.absGapdate + " days an avarege date will be considered " + gapDate.avarageDate)
        // }
      })
    }

    skinfolds.chestDataSet.forEach(element => { element.label = element.label + " - fold", element.yAxisID = "yAxesKg" });
    skinfolds.armDataSet.forEach(element => { element.label = element.label + " - fold", element.yAxisID = "yAxesKg" });
    skinfolds.abdominalDataSet.forEach(element => { element.label = element.label + " - fold", element.yAxisID = "yAxesKg" });
    skinfolds.thighDataSet.forEach(element => { element.label = element.label + " - fold", element.yAxisID = "yAxesKg" });
    girths.chestDataSet.forEach(element => { element.label = element.label + " - girth", element.hidden = false, element.borderWidth = 2 });
    girths.armDataSet.forEach(element => { element.label = element.label + " - girth", element.hidden = false, element.borderWidth = 2 });
    girths.abdominalDataSet.forEach(element => { element.label = element.label + " - girth", element.hidden = false, element.borderWidth = 2 });
    girths.thighDataSet.forEach(element => { element.label = element.label + " - girth", element.hidden = false, element.borderWidth = 2 });
    let chestDataSet = girths.chestDataSet.concat(skinfolds.chestDataSet)
    let armDataSet = girths.armDataSet.concat(skinfolds.armDataSet)
    let abdominalDataSet = girths.abdominalDataSet.concat(skinfolds.abdominalDataSet)
    let thighDataSet = girths.thighDataSet.concat(skinfolds.thighDataSet)

    return { chestDataSet, armDataSet, abdominalDataSet, thighDataSet, avarageDateArray, maxChest, maxArm, maxAbs, maxThigh, maxCalf }
  }

  //LINE CHART

  lineChartGirthsOverSkinfolds(data: ChartDataSets[], labels: string[], max: number) {

    let Linechart = new Chart('girthsOverSkinfolds', {
      type: 'line',
      data: {
        labels: labels,
        datasets: data
      },
      options: this.lineChartOption("Girths ( mm )", "Skinfold ( mm )", max, max)
    })

    return Linechart
  }

  UpdateLineChartGirthsOverSkinfolds(chart, data, max) {
    chart.data.datasets = data
    chart.options = this.lineChartOption("Girths ( mm )", "Skinfold ( mm )", max, max)
    chart.update();
  }

  UpdateLineChartSkinfolds(chart, data, maxSkinfold, maxWeight, maxBodyDensity) {
    chart.data.datasets = data
    chart.options = this.dualChartOption("Weight, Lean mass, Fat maas ( Kg )", "Body density ( g/cc )", "Skinfolds sum ( mm )", true, maxSkinfold + 10, maxWeight, maxBodyDensity)
    chart.update();
  }

  UpdateLineChartSkinfoldsBack(chart, data: ChartDataSets[], labels: string[], maxSkinfold: number, maxWeight: number) {
    chart.data.datasets = data
    chart.data.labels = labels
    chart.options = this.lineChartOption("Skinfold ( mm )", "Body weight ( Kg )", maxSkinfold, maxWeight)
    chart.update();
  }

  lineChartSkinfolds(data: ChartDataSets[], labels: string[], maxSkinfold: number, maxWeight: number) {
    let Linechart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: data
      },
      options: this.lineChartOption("Skinfold ( mm )", "Body weight ( Kg )", maxSkinfold, maxWeight)
    });
    return Linechart
  }

  lineChartGirths(t: Girths[]) {
    let s = this.girthLineChartData(t)
    let Linechart = new Chart('LineChartGirths', {
      type: 'line',
      data: {
        labels: s.lineChartLabels,
        datasets: s.arrayChartDataSet
      },
      options: this.lineChartOption("Girths ( mm )", "Body weight ( Kg )", s.maxForAllGirths, s.maxWeight)
    });
    return Linechart
  }

  lineChartOption(yAxesIdLeft: string, yAxesIdRight: string, yAxesMmMaxScale: number, yAxesKgMaxScale: number) {
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
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' }
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
  //DUAL CHART
  dualChartOption(yAxesIdLeftMaas: string, yAxesIdRightBDensity: string, yAxesIdSkinfoldsSum: string, stacked: boolean, sumMax: number, weightScale: number, bodyDensityMax: number) {
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
            gridLines: { color: 'rgba(255, 255, 255, 0.1)' }
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
            ticks: { max: weightScale + 5, beginAtZero: true },
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
      backgroundColor: ["orangered", "lightskyblue"],
      borderColor: "white",
      borderWidth: 1
    }]

  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.2,
    animation: { animateRotate: true, animateScale: true },
    legend: {
      display: false, position: 'top',
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

 // Pippo = new BehaviorSubject<any>(null)

  // sendMessage(obj){
  //   this.Pippo.next(obj)
  // }

  // geMessage() {
  //   return this.Pippo.asObservable()
  // }
//this.sendMessage({skinfoldChartDataSet, skinfoldXaxisLabel, maxSkinfold, bodyCompostitionDataSet, maxWeight, maxBodyDensity})

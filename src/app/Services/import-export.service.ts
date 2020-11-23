import { DummyDataService } from './../Utility/dummyData.service';
import { Injectable } from '@angular/core';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {

  constructor(private dummyDataService: DummyDataService) { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  flatCaliperForDB() {
    let i = this.dummyDataService.dummyArrayCaliper

    let localSkinfoldObject = [...i].sort((d1, d2) => new Date(d1.metadata.date).getTime() - new Date(d2.metadata.date).getTime())
    let e: any[] = []
    localSkinfoldObject.map((element) => {
      let o = { ...element.metadata, ...element.fold, ...element.bodyResult }
      e.push(o)
    });
    this.exportAsExcelFile(e, 'SkinFolds')
  }
}
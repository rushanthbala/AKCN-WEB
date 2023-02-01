import * as XLSX from 'xlsx';

const getFileName = (name: string) => {
  // let timeSpan = new Date().toISOString();
  // let sheetName = name || 'ExportResult';
  // let fileName = `${sheetName}-${timeSpan}`;
  let date : any = new Date();
  let year : any = date.getFullYear();
  let month : any = date.getMonth() + 1;
  let todayDate : any = date.getDate();
  let hours: any = date.getHours();
  let minutes: any = date.getMinutes();
  let seconds: any = date.getSeconds();

  if(month < 10){
    month = '0' + month;
  }
  if(todayDate < 10){
    todayDate = '0' + todayDate;
  }
  if(hours<10){
    hours = '0' + hours;
  }
  if(minutes < 10){
    minutes = '0' + minutes;
  }
  if(seconds < 10){
    seconds = '0' + seconds;
  }

  var output = year + "-" + month + "-" + todayDate;
  var output2 = hours + ":" + minutes + ":" + seconds;

  let sheetName = name || 'ExportResult';
  let fileName = `${sheetName} ${output} ${output2}`;
  return {
    sheetName,
    fileName,
  };
};
export class TableUtil {
  static exportTableToExcel(tableId: string, name: string) {
    let { sheetName, fileName } = getFileName(name);
    let targetTableElm = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{
      sheet: sheetName,
    });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  static exportArrayToExcel(arr: any[], name: string) {
    let { sheetName, fileName } = getFileName(name);

    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}

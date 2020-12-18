import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class Utility {

  btnStatusSbubs = new Subject<string>();

  numberDecimal(value, exp) {

    if (typeof exp === 'undefined' || +exp === 0)
      value = +value;
    exp = +exp;
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
      return NaN;
    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));

  }

  DateFormatToString(date) {
    let days = date.getDate();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = days + '/' + month + '/' + year + '/ ' + hours + ':' + minutes;
    return strTime;
  }


  FormattedDate(d: Date) {
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
      .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
  }


  betweenRange(x, min, max) {
    return x >= min && x <= max;
  }

  formulaJPMan7(sum: number, age: number) {
    //sum = chest+abdominal+thigh+midaxillary+suprailiac+subscapular+triceps
    let bodyDensity = 1.112 - (0.00043499 * sum) + (0.00000055 * (sum * sum)) - (0.00028826 * age)

    return { bodyDensity }
  }

  formulaJPWoman7(sum: number, age: number) {
    //sum = chest+abdominal+thigh+midaxillary+suprailiac+subscapular+triceps
    return { bodyDensity: 1.097 - (0.00046971 * sum) + (0.00000056 * (sum * sum)) - (0.00012828 * age) }
  }

  formulaJPMan3({ sum, age }: { sum: number; age: number; }) {
    //sum = chest+abdominal+thigh
    return { bodyDensity: 1.10938 - (0.0008267 * sum) + (0.0000016 * (sum * sum)) - (0.0002574 * age) }
  }

  formulaJPWoman3(sum: number, age: number) {
    //sum = thigh+suprailiac+triceps
    return { bodyDensity: 1.0994921 - (0.0009929 * sum) + (0.0000023 * (sum * sum)) - (0.0001392 * age) }
  }

  formulaSloanMan2(thigh: number, subscapular: number) {
    return { bodyDensity: 1.1043 - (0.001327 * thigh) - (0.00000055 * subscapular) }
  }

  formulaSloanWoman2(suprailiac: number, triceps: number) {
    return { bodyDensity: 1.0764 - (0.0008 * suprailiac) - (0.00088 * triceps) }
  }

  formulaDurninWomersleyMan(sum: number, age: number) {
    //sum = triceps+biceps+subscapular+suprailiac
    switch (true) {
      case age < 17: return { bodyDensity: 1.1533 - (0.0643 * Math.log10(sum)) }
      case age < 19: return { bodyDensity: 1.1620 - (0.0630 * Math.log10(sum)) }
      case age < 29: return { bodyDensity: 1.1631 - (0.0632 * Math.log10(sum)) }
      case age < 39: return { bodyDensity: 1.1422 - (0.0544 * Math.log10(sum)) }
      case age < 49: return { bodyDensity: 1.1620 - (0.0700 * Math.log10(sum)) }
      case age < 100: return { bodyDensity: 1.1715 - (0.0779 * Math.log10(sum)) }
    }
  }

  formulaDurninWomersleyWoman(sum: number, age: number) {
    //sum = triceps+biceps+subscapular+suprailiac
    switch (true) {
      case age < 17: return { bodyDensity: 1.1369 - (0.0598 * Math.log10(sum)) }
      case age < 19: return { bodyDensity: 1.1549 - (0.0678 * Math.log10(sum)) }
      case age < 29: return { bodyDensity: 1.1599 - (0.0717 * Math.log10(sum)) }
      case age < 39: return { bodyDensity: 1.1423 - (0.0632 * Math.log10(sum)) }
      case age < 49: return { bodyDensity: 1.1333 - (0.0612 * Math.log10(sum)) }
      case age < 100: return { bodyDensity: 1.1339 - (0.0645 * Math.log10(sum)) }
    }
  }



}

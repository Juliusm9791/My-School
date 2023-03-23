import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  // you can override any of the methods defined in the parent class

  public override monthViewColumnHeader({
    date,
    locale,
  }: DateFormatterParams): any {
    if (locale) {
      const dayName = formatDate(date, 'EEE', locale);
      return dayName.toUpperCase();
    }
  }

  public override monthViewTitle({ date, locale }: DateFormatterParams): any {
    if (locale) return formatDate(date, 'MMMM y', locale);
  }

  public override weekViewColumnHeader({
    date,
    locale,
  }: DateFormatterParams): any {
    if (locale) {
      const dayName = formatDate(date, 'EEE', locale);
      return dayName.toUpperCase();
    }
  }

  public override dayViewHour({ date, locale }: DateFormatterParams): any {
    if (locale) return formatDate(date, 'HH:mm', locale);
  }
}

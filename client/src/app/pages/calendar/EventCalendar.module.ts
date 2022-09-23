import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventCalendarComponent } from './EventCalendar.component';
import { CalendarHeaderComponent } from './calendar-header.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    // DemoUtilsModule,
  ],
  declarations: [EventCalendarComponent, CalendarHeaderComponent],
  exports: [EventCalendarComponent, CalendarHeaderComponent],
})
export class EventCalendarModule {}
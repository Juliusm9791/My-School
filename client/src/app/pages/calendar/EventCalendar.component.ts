import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
// import { isSameDay, isSameMonth } from 'date-fns';
import { PostsService } from '../posts/posts.service';


const colors = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#4050b2',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-eventCalendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './EventCalendar.component.html',
  styleUrls: ['./EventCalendar.component.css'],
})

export class EventCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  events: CalendarEvent<{ id: string }>[]  = [];

  viewDate: Date = new Date();
  constructor(private postsService: PostsService) {
    this.events = this.postsService.filterEvents();
  }

  ngOnInit(): void {}

}

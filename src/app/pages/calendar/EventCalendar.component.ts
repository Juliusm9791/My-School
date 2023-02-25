import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
// import { isSameDay, isSameMonth } from 'date-fns';
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-eventCalendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './EventCalendar.component.html',
  styleUrls: ['./EventCalendar.component.css'],
})
export class EventCalendarComponent implements OnInit {
  @Input() homeCalendar: boolean = false;
  view: CalendarView = CalendarView.Month;
  events: CalendarEvent<{ id: string }>[] = [];

  viewDate: Date = new Date();
  constructor(private postsService: PostsService, private router: Router) {
    this.events = this.postsService.filterEvents();
  }

  ngOnInit(): void {
    this.postsService.queryPosts();
  }

  eventClicked(event: any) {
    this.router.navigate(['/posts/' + event.event.meta.id]);
  }
}

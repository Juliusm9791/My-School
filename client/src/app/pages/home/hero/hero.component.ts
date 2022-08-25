import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { interval, Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { slider } from './slide-animation';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  name = 'Angular';
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  images = [
    'https://images.unsplash.com/photo-1521742798197-c6d112b91cdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    'https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1644&q=80',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    'https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    'https://images.unsplash.com/photo-1464983308776-3c7215084895?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
  ];

  carouselBanner: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 5,
    slide: 1,
    speed: 400,
    interval: {
      timing: 4000,
      initialDelay: 1000,
    },
    point: {
      visible: true,
    },
    custom: 'banner',
    loop: true,
    touch: true,
  };
  tempData: any[];

  public carouselTileItems$: Observable<number[]>;

  constructor() {
    this.tempData = [];

    this.carouselTileItems$ = interval(500).pipe(
      startWith(-1),
      take(30),
      map((val) => {
        const data = (this.tempData = [
          ...this.tempData,
          this.images[Math.floor(Math.random() * this.images.length)],
        ]);
        return data;
      })
    );
  }

  /* It will be triggered on every slide*/
  onmoveFn(data: any) {}

  trackCarousel(_: any, item: any) {
    return item;
  }
}

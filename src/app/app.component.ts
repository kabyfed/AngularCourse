import { Component } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  defaultStreamSubscrip$!: Subscription;
  defaultIntervalSubscrip$!: Subscription;

  randomValues: string[] = [];
  defaultValues: number[] = [];

  constructor() { }

  randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  startStreams() {
    this.setRandomSubscribe();
    this.setDefaultSubscribe();
  }

  setRandomSubscribe() {
    if (this.defaultStreamSubscrip$ && !this.defaultStreamSubscrip$.closed) {
      return;
    }

    const intervalStream = interval(2000);
    this.defaultStreamSubscrip$ = intervalStream.pipe(
      map(() => `Random Value: ${this.randomInteger(1, 1000)}`)
    )
      .subscribe((value) => {
        this.randomValues.push(value);
      });
  }

  setDefaultSubscribe() {
    if (this.defaultIntervalSubscrip$ && !this.defaultIntervalSubscrip$.closed) {
      return;
    }

    const intervalStream = interval(2000);
    this.defaultIntervalSubscrip$ = intervalStream.subscribe((num) => {
      this.defaultValues.push(num);
    });
  }

  disableDefaultSubscribe() {
    this.defaultIntervalSubscrip$.unsubscribe();
  }

  disableRandomSubscribe() {
    this.defaultStreamSubscrip$.unsubscribe();
  }
}

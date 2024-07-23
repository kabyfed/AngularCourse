import { Injectable } from '@angular/core';
import { DataService } from './services/data.service';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PreFetchingResolver implements Resolve<object> {

  constructor(private dataService: DataService) { }

  resolve(): Observable<object> {
    return this.dataService.getData();
  }
}

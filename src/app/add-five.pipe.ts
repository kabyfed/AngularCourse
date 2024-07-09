import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addFive'
})
export class AddFivePipe implements PipeTransform {

  transform(value: number): unknown {
    return value + 5;
  }

}

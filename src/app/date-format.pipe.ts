import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(dateString: string | null | undefined): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('ru-RU', { month: 'long' });
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month}, ${hours}:${minutes}`;
  }
}

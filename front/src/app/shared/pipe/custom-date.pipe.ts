import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {

    transform(value: number[]): string {
        if (!value || value.length < 3) {
            return '';
        } else {
            return `${value[2]}/${value[1]}/${value[0]}`;
        }
    }

}

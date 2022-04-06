import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  artists: any[] = []
  transform(value: any[]): any[] {
    console.log(value);
    for (let index = 0; index < value.length; index++) {
        this.artists.push(value[index]);
    }

    return this.artists;
  }

}

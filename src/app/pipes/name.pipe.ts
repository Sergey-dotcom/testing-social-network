import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toInitials',
})
export class NamePipe implements PipeTransform {
  transform(name: string): string {
    return name.split(' ').map((w,i) => i ? w.substring(0,1).toUpperCase() + '.' : w).join(' ');
  }
}

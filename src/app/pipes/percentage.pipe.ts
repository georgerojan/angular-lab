import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value + '%';
  }

  //deciding promises vs observable

  //paging active extension

  //scroll 

  //caching v=capability

  //off-line support

  //compiler works

  //routing

  //life cycle hooks

  //How do control 

  //ui experience 

  //conditioanl ways to show / hide

  //awreness - redux


}

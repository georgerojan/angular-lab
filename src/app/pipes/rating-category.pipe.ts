import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingCategory'
})
export class RatingCategoryPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value <= 2)
      return "Poor";
    else if (value <= 4)
      return "Fine";
    else
      return "Excellent";
  }

}

import { Pipe, PipeTransform } from '@angular/core';

/**
 * it filters the input data array based on the search text
 * and on the filterBy property even if it is nested within the object
 */
@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(data: Array<any>, filterBy: string, searchText: string): Array<any> {

    // return the data as it is if search text is empty
    if (searchText === '') {
      return data;
    }

    return data.filter(item => {
      // if data is an array of objects
      if (filterBy) {
        const filterByArray = filterBy.split('.');
        for (let i = 0; i < filterByArray.length; i++) {
          item = item[filterByArray[i]];
        }
      }
      return item.toLowerCase().includes(searchText.toLowerCase());
    });

  }

}

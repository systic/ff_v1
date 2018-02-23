import { Pipe, PipeTransform } from '@angular/core';

/**
 * alphanumeric sort can sort types which are numeric(int as well as float)
 * or string or mixed of numeric and string but not other types like date, etc
 */
@Pipe({
  name: 'alphanumericSort'
})
export class AlphanumericSortPipe implements PipeTransform {

  transform(data: Array<any>, sortBy: any, orderIn: any): Array<any> {

    let desc = true;
    if (orderIn === 'ascending') {
      desc = false;
    }

    data.sort((a: any, b: any) => {
      // it data is an array of objects
      if (sortBy) {
        // create an array of the nesting
        const sortByArray = sortBy.split('.');
        // if it is a nested sort property, get to it first
        for (let i = 0; i < sortByArray.length; i++) {
          a = a[sortByArray[i]];
          b = b[sortByArray[i]];
        }
      }

      a = this.normalizeMixedDataValue(a);
      b = this.normalizeMixedDataValue(b);

      return ((a < b) ? 1 : -1) * ((desc) ? 1 : -1);
    });

    return data;
  }

  private normalizeMixedDataValue(value) {
    const padding = '000000000000000';

    value = value.replace(/(\d+)((\.\d+)+)?/g,
      ( $0, integer, decimal, $3 ) => {
        if ( decimal !== $3 ) {
          return(
            padding.slice( integer.length ) +
            integer +
            decimal
          );
        }

        decimal = ( decimal || '.0' );

        return(
          padding.slice( integer.length ) +
          integer +
          decimal +
          padding.slice( decimal.length )
        );
      }
    );

    return value;
  }

}

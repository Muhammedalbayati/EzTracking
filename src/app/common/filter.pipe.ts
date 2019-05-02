import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], searchText: string): any[] {


    //  if (!list) return [];
    // if (!searchText) return list;
    //   searchText = searchText.toLocaleLowerCase();
    //   return list.filter((item) =>
    //     Object.keys(item).some(prop => {
    //       let value = item[prop];

    //       if (typeof value === "string") {

    //         value = value.toLocaleLowerCase();
    //       }
    //       // console.log(value.toString())
    //       // console.log(value.toString().toString().indexOf(searchText))
    //       if (value == null) return
    //       return value.toString().indexOf(searchText) !== -1;
    //     })
    //   );



    if (!list) return [];
    if (!searchText) return list;

    list.forEach(obj => {
      // console.log(obj)
      Object.keys(obj).forEach(prop => {
        console.log(obj[prop])

      })
    })



    // if (!list) return [];
    // if (!searchText) return list;
    // searchText = searchText.toLowerCase();

    // return list.filter((item) =>
    //   Object.keys(item).some(prop => {
    //     let value = item[prop];
    //     if (typeof value === "string") {
    //       value = value.toLocaleLowerCase();
    //     }
    //     console.log(value)
    //     return value.toString().indexOf(searchText) !== -1;
    //   })
    // );



  }
}
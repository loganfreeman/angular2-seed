import { FORM_DIRECTIVES } from '@angular/common';
import { Component, HostListener } from '@angular/core';

import { NameListService } from '../../shared/index';

import {CapitalFirstPipe} from '../../shared/pipes/capital-first';

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+home/components/home.component.html',
  styleUrls: ['app/+home/components/home.component.css'],
  directives: [FORM_DIRECTIVES],
  pipes: [CapitalFirstPipe]
})
export class HomeComponent {
  categoryMap: { [category: string]: any[]} = {
    sorting: [{
      label: 'insertion',
      text: 'Insertion Sort'
    }, {
      label: 'selection',
      text: 'Selection Sort'
    }]
  }
  categories: string[] = Object.keys(this.categoryMap)
  categoryStateMap: { [category: string]: boolean} = {
    sorting: true
  }
  onCategoryBtnClick(category: string) {
    if (this.categoryStateMap[category]) {
      this.categoryStateMap[category] = false
    } else {
      this.categoryStateMap[category] = true
    }
  }
  getCategoryState(category: string) {
    return {
      collapse: this.categoryStateMap[category]
    }
  }
}

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
    }, {
      label: 'bubble',
      text: 'Bubble Sort'
    }, {
      label: 'merge',
      text: 'Merge Sort'
    }, {
      label: 'quick',
      text: 'Quick Sort'
    }, {
      label: 'heap',
      text: 'Heap Sort'
    }],
    search: [{
      label: 'binary search',
      text: 'Binary Search'
    }],
    string: [{
      label: 'edit distance',
      text: 'Edit Distance'
    }, {
      label: 'suffix array',
      text: 'Suffix Array'
    }],
    greey: [{
      label: 'job scheduling',
      text: 'Job Scheduling'
    }],
    graph: [{
      label: 'bfs',
      text: 'Breadth First Search'
    }, {
      label: 'dfs',
      text: 'Depth First Search'
    }]
  }
  categories: string[] = Object.keys(this.categoryMap)
  categoryStateMap: { [category: string]: boolean} = {}
  constructor() {
    for(let category of this.categories) {
      this.categoryStateMap[category] = true
    }
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
  getCaretClass(category: string) {
    return {
      'fa-rotate-270': this.categoryStateMap[category]
    }
  }
}

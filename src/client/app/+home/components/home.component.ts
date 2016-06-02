import { FORM_DIRECTIVES } from '@angular/common';
import { Component, HostListener } from '@angular/core';

import { NameListService } from '../../shared/index';

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+home/components/home.component.html',
  styleUrls: ['app/+home/components/home.component.css'],
  directives: [FORM_DIRECTIVES]
})
export class HomeComponent {
  isCategoryCollasped: boolean = true;
  onCategoryBtnClick($event: MouseEvent) {
    this.isCategoryCollasped = !this.isCategoryCollasped
  }
}

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';

import { AboutComponent } from '../+about/index';
import { LightOutAppComponent } from '../+lightout/index';
import { SudokuAppComponent } from '../+sudoku/index';
import { HomeComponent } from '../+home/index';
import { NameListService } from '../shared/index';
import { NavbarComponent } from './navbar.component';
import { ToolbarComponent } from './toolbar.component';
import {TetrisComponent} from '../+tetris/index';

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService],
  templateUrl: 'app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent]
})
@Routes([
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/about',
    component: AboutComponent
  },
  {
    path: '/lightout',
    component: LightOutAppComponent
  },
  {
    path: '/sudoku',
    component: SudokuAppComponent
  },
  {
    path: '/tetris',
    component: TetrisComponent
  }
])
export class AppComponent {}

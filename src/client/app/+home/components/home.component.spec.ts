import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import {
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { NameListService } from '../../shared/index';
import { HomeComponent } from './home.component';

export function main() {
  describe('Home component', () => {
    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
	  .then((rootTC: any) => {
            rootTC.detectChanges();

            let homeInstance = rootTC.debugElement.children[0].componentInstance;
            let homeDOMEl = rootTC.debugElement.children[0].nativeElement;
          });
      }));
  });
}

@Component({
  providers: [],
  selector: 'test-cmp',
  template: '<sd-home></sd-home>',
  directives: [HomeComponent]
})
class TestComponent {}

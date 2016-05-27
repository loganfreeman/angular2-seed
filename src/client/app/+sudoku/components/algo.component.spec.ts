import * as algo from './algo';

import {
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';

export function main() {
  describe('sudoku algorithm', () => {
    it('make sudoku', () => {
      var a = algo.makeSudoku();
    });
  });
}

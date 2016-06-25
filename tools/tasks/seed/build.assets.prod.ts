import * as gulp from 'gulp';
import { join } from 'path';

import { APP_DEST, APP_SRC, ASSETS_SRC, TEMP_FILES } from '../../config';

// TODO There should be more elegant to prevent empty directories from copying
let es: any = require('event-stream');
var onlyDirs = function (es: any) {
  return es.map(function (file: any, cb: any) {
    if (file.stat.isFile()) {
      return cb(null, file);
    } else {
      return cb();
    }
  });
};

export = () => {
  return es.merge([
    gulp.src(['lib/sigmajs-v1.0.0/sigma.min.js', 'node_modules/markdown/lib/markdown.js'])
      .pipe(gulp.dest(APP_DEST)),
    gulp.src([
      join(APP_SRC, '**'),
      '!' + join(APP_SRC, '**', '*.ts'),
      '!' + join(APP_SRC, '**', '*.css'),
      '!' + join(APP_SRC, '**', '*.html'),
      '!' + join(ASSETS_SRC, '**', '*.js')
    ].concat(TEMP_FILES.map((p) => { return '!' + p; })))
      .pipe(onlyDirs(es))
      .pipe(gulp.dest(APP_DEST))
  ]);
};

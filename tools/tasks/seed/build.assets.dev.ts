import * as gulp from 'gulp';
import { join } from 'path';

import { APP_DEST, APP_SRC, TEMP_FILES } from '../../config';
let es: any = require('event-stream');

export = () => {
  let paths: string[] = [
    join(APP_SRC, '**'),
    '!' + join(APP_SRC, '**', '*.ts')
  ].concat(TEMP_FILES.map((p) => { return '!' + p; }));

  return es.merge([
    gulp.src(paths)
      .pipe(gulp.dest(APP_DEST)),
    gulp.src(['lib/sigmajs-v1.0.0/sigma.min.js'])
      .pipe(gulp.dest(APP_DEST))
  ]);
};

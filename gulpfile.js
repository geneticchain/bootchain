//-----------------------------------------------------------------------------
// gulpfile.js - master gulp task file
//-----------------------------------------------------------------------------

'use strict';

//-----------------------------------------------------------------------------
// includes
//-----------------------------------------------------------------------------

const gulp   = require('gulp');
const minify = require('gulp-minify');
const concat = require('gulp-concat');

//-----------------------------------------------------------------------------
// tasks
//-----------------------------------------------------------------------------

/**
 * Build art script.
 */
gulp.task('js:art', () => gulp
  .src(['src/traits.js', 'src/art.js'])
  .pipe(concat('art.js'))
  .pipe(gulp.dest('app/dist'))
);

/**
 * Build metadata script.
 */
gulp.task('js:metadata', () => gulp
  .src(['src/traits.js', 'src/metadata.js'])
  .pipe(concat('metadata.js'))
  .pipe(gulp.dest('app/dist'))
);

/**
 * Minify script.
 */
gulp.task('js:min', () => gulp
  .src('app/dist/art.js')
  .pipe(minify())
  .pipe(gulp.dest('app/dist'))
);

//-----------------------------------------------------------------------------
// watch
//-----------------------------------------------------------------------------

gulp.task('watch', function() {
  gulp.watch('src/*.js', gulp.series('js:art'));
});

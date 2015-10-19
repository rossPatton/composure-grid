'use strict'

const gulp = require( 'gulp' )
const stylus = require( 'gulp-stylus' )
const mq = require( 'css-mqpacker' )
const postcss = require( 'gulp-postcss' )
const composure = require( './lib/composure-grid' )

/**
 * compiles, autoprefixes, minifies, the stylus
 */
gulp.task( 'stylus', () => {
  return gulp.src( './lib/composure-grid.styl' )
    .pipe( stylus( {
      compress: false,
      use: composure( {
        gutters: true,
        preset: 'simple',
      } ),
    } ) )
    .pipe( postcss( [mq] ) )
    .pipe( gulp.dest( './css' ) )
} )

/**
 * Watch for file changes and rebuild. For client side changes we can
 * automatically reload the files without having to reload the server.
 * Server side changes require a SIGHUP to restart the server.
 */
gulp.task('watch', function() {
  return gulp.watch(['./styl/**/*.styl'], ['stylus'])
})


gulp.task( 'default', ['stylus', 'watch'] )

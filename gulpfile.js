'use strict'

var gulp = require( 'gulp' )
var stylus = require( 'gulp-stylus' )
var mq = require( 'css-mqpacker' )
var postcss = require( 'gulp-postcss' )
var composure = require( './lib/composure-grid' )

/**
 * compiles, autoprefixes, minifies, the stylus
 */
gulp.task( 'stylus', function() {
  return gulp.src( './lib/composure-grid.styl' )
    .pipe( stylus( {
      compress: true,
      use: composure( {
        alpha: false,
        columns: 12,
        columnBaseClass: 'col',
        columnPadding: false,
        columnPrefix: '',
        directions: {
          t: 'top',
          r: 'right',
          b: 'bottom',
          l: 'left',
        },
        displayClasses: true,
        displayOverrides: false,
        flexSupport: true,
        flexOrder: true,
        gridBreakpoints: {
          m: {
            max: 767,
            isMobile: true,
          },
          t: {
            min: 768,
          },
          d: {
            min: 1200,
          },
        },
        gutters: {
          base: 10,
          range: 3,
          scale: 2,
          values: {
            0: 10,
            1: 20,
            2: 40,
          },
        },
        includeMobile: false,
        mediaUnit: 'px',
        omega: true,
        preset: 'simple',
        pull: false,
        push: false,
        siteWidth: 80,
        spacer: 'margin',
        spacerAmount: 1,
        spacerBottom: true,
        spacerDirection: 'right',
        spacerType: '%',
        widthType: '%',
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

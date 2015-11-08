# composure

A framework generator based on the ideas of atomic-css, but without the incomprehensible syntax. However, this tool is flexible enough to generate most kinds of css frameworks with a bit a fiddling around.

pass in a config object, get a different grid. composure-grid makes it easy to add and remove grid functionality as you need it, with lightweight output that won't slow down your site.


![yodawg](https://i.imgflip.com/sig5d.jpg)

do this:

![do this](https://cloud.githubusercontent.com/assets/2379901/10447049/9f4aeab6-7135-11e5-90a2-776997f3fb8b.png)


get this:

![composure-grid](https://cloud.githubusercontent.com/assets/2379901/10570762/4ac2a6bc-75ec-11e5-960f-74199112cdf8.png)


until I have more time to write some documentation, here's all the possible options with their defaults (if you don't pass in a value, the defaults will be applied):

```javascript
'use strict'

var gulp = require( 'gulp' )
var stylus = require( 'gulp-stylus' )
var mq = require( 'css-mqpacker' )
var postcss = require( 'gulp-postcss' )
var composure = require( 'composure-grid' )

gulp.task( 'stylus', function() {
  return gulp.src( './styl/main.styl' )
    .pipe( stylus( {
      compress: false,
      use: composure( {
      // how many columns to generate
        columns: 12,
      // base column class
        columnBaseClass: 'col',
      // should columns have padding?
        columnPadding: false,
      // prefix the column classes (col-tab-1 instead of tab-1)
        columnPrefix: '',
      // if outputting gutters, do you want to output each direction as well?
        directions: {
          t: 'top',
          r: 'right',
          b: 'bottom',
          l: 'left',
        },
      // hide/show classes for each defined breakpoint
        displayClasses: true,
      // remove/reveal classes for each defined breakpoint
        displayOverrides: false,
      // by default use a flexbox based grid
        flexSupport: true,
      // include re-ordering classes for each breakpoint (order-1, tab-order-2, etc)
        flexOrder: true,
      // mobile first grid,
      // mark property that you will use as your mobile breakpoint
        gridBreakpoints: {
          mob: {
            max: 767,
            isMobile: true,
          },
          tab: {
            min: 768,
          },
          desk: {
            min: 1200,
          },
        },
      // margin and padding helper classes
      // pass in true for default, false for no gutters
      // values is used to hard code the gutter name and values
      // base/range/scale is used to generate a range of gutters
      // the example values object is what
      // the default base/range/scale combo creates
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
      // include mobile column classes, default to just one grid on mobile
        includeMobile: false,
      // works with gridBreakpoints to designate the unit type of our min/max values
        mediaUnit: 'px',
      // include omega classes for zeroing out column spacers
        omega: true,
      // the default preset, you don't need to pass this in
      // the other current option is WIRED
      // which is the grid used by wired.com
      // when you change a preset the defaults just change
      // you can still override them
        preset: 'simple',
      // how wide the container class is
        siteWidth: 80,
      // should columns have default margin/padding? can be 'margin'|'padding'|false
        spacer: 'margin',
      // the amount of spacing to do
        spacerAmount: 20,
      // include spacing on the bottom as well
        spacerBottom: true,
      // the unit type of the spacer, can be whatever ('px'|'vw'|'rem'|'%' etc)
        spacerType: 'px',
      // specifies unit type for siteWidth
        widthType: '%',
      } ),
    } ) )
    .pipe( postcss( [mq] ) )
    .pipe( gulp.dest( './css' ) )
} )
```


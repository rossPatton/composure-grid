# composure

![yodawg](https://i.imgflip.com/sig5d.jpg)

do this:

![do this](https://cloud.githubusercontent.com/assets/2379901/10447049/9f4aeab6-7135-11e5-90a2-776997f3fb8b.png)


get this:

![composure-grid](https://cloud.githubusercontent.com/assets/2379901/10570762/4ac2a6bc-75ec-11e5-960f-74199112cdf8.png)

Composure makes it easy to add and remove grid functionality as you need it, with lightweight atomic output that won't slow down your site A framework generator based on the ideas of atomic-css, but without the incomprehensible bullshit syntax. Composure gives you a css system where each class does one little thing - and that's it. No cascading bullshit, and still flexible enough to generate most kinds of css frameworks with a bit a fiddling around.

By passing in a config object, you generate a different grid and gutter system. Great for use in production (the WIRED preset is more or less what WIRED uses) or even just for rapid prototyping.

Another perk - since the actual css is dynamically generated maintenance is easy. Need to change some global variables, or media queries? Just update the properties in the config object and you're good to go, no weird bower or npm workarounds or manual overrides needed.

All options set here via the global config get set as global stylus vavriables. I also throw in a few mixins/extends. Feel free to override / use them as needed, although you shouldn't really need to do this (just change the config!).

### Presets
Composure comes with a few default grid presets. All of them are mobile first, and support flexbox by default (with helper classes for re-ordering, row direction, etc). 

`simple` is the default grid. If you don't pass in a config object or specify a different preset, simple's defaults will be used. `simple` is a 12 column, mobile first grid, with 3 breakpoints (mobile, tablet, desktop). There are no pushes or pulls, but there are omega classes. It also includes a basic margin and padding gutter system. It's a whopping 7kb, and I've some variation of this scheme in production for a long time. It's awesome.

`WIRED` is based on the grid I put together at WIRED. It's a slightly more complicated version of simple. It has 18 columsn instead of 12. It has 4 breakpoints  (mobile, tablet, desktop, and wide). All breakpoints except wide have maxes instead of just mins, and it has a slightly more extensive gutter system that is the exact one used by WIRED (8, 16, 32, 64).

`bootstrap` is based on bootstrap 4 by twitter. It's basically a copy of their grid system - only you can override any aspect of it you don't like! It has 12 columns, 5 breakpoints, uses rems for media queries but not padding, and uses their class names and structure how you would expect. Also has pushes/pulls. No gutter system by default.

`foundation` is based on foundation 5 by zurb. It's basically a copy of their grid system - only you can override any aspect of it you don't like! It has 12 columns, 5 breakpoints, uses rems for everything, and uses their class names and structure how you would expect. Also has pushes/pulls. No gutter system by default.

More presets will come as I get to it, or if anyone wants to write one :)


### Options
Eventually I'd like to go through and create demos for all these options, but you can play around with them yourself:


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
      // no margin left, used with a left first spacer grid
        alpha: false,
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
      // when you change a preset the defaults just change
      // you can still override them
      // presets include WIRED style, bootstrap, foundation, with more coming maybe
        preset: 'simple',
      // push classes for columns (tab-push-3 etc)
        push: false,
      // pull classes for columns (tab-pull-3 etc)
        pull: false,
      // how wide the container class is
        siteWidth: 80,
      // should columns have default margin/padding? can be 'margin'|'padding'|false
        spacer: 'margin',
      // the amount of spacing to do
        spacerAmount: 20,
      // include spacing on the bottom as well
        spacerBottom: true,
      // what side of your columns do you want spacing:
      // 'left' || 'right' || 'both'
        spacerDirection: 'right',
      // the unit type of the spacer, can be whatever ('px'|'vw'|'rem'|'%' etc)
        spacerType: 'px',
      // specifies unit type for siteWidth property
        widthType: '%',
      } ),
    } ) )
    .pipe( postcss( [mq] ) )
    .pipe( gulp.dest( './css' ) )
} )
```


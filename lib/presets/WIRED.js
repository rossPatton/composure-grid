'use strict'

/**
 * Module dependencies.
 */
var stylus = require( 'stylus' )
var _ = require( 'lodash' )
var path = require( 'path' )
var nodes = stylus.nodes

var wiredStyle = function( style, opts ) {
  // by default we support flexbox
  var flexBox = true
  if ( opts.flexSupport === false ) {
    flexBox = false
  }

  // by default we don't include column padding
  var padding = false
  if ( opts.columnPadding === true ) {
    padding =  new nodes.Literal( opts.columnPadding )
  }

  var defaultBreakpoints = {
    mob: {
      max: 767,
      isMobile: true,
    },
    tab: {
      min: 768,
      max: 960,
    },
    desk: {
      min: 961,
      max: 1199,
    },
    wide: {
      min: 1200,
    }
  }

  // these are the breakpoints we use to define the grid
  style.define( '$grid-breakpoints', opts.gridBreakpoints || defaultBreakpoints, true )
  style.define( '$media-unit', opts.mediaUnit || 'px' )

  var mob = [{}]
  if ( opts.gridBreakpoints ) {
    mob = _.filter( opts.gridBreakpoints, function(b) {
      return b.isMobile === true
    } )
  }
  else {
    mob = _.filter( defaultBreakpoints, function(b) {
      return b.isMobile === true
    } )
  }

  // we need to create a $mob-plus variable
  var unit = opts.mediaUnit || 'px'
  var min = mob[0].max + 1
  var mobPlus = '( min-width: ' + min + unit + ' )'
  style.define( '$mob-plus', mobPlus )

  // - GRID SETTINGS
  // how many columns to generate
  style.define( '$columns', opts.columns || 18 )
  // base column class
  style.define( '$column-base', opts.columnBaseClass || 'col' )

  // basic flex box support?
  style.define( '$flexbox-support', flexBox )
  // generate flexbox re-ordering classes
  style.define( '$flexbox-order', opts.flexOrder || true )
  // column padding, by default columns do not have padding
  // can conflict with $spacer if $spacer is set to 'padding'
  style.define( '$column-padding', padding || false )
  // whether or not to prefix the column classes (col-tab-2 vs tab-2)
  style.define( '$column-prefix', opts.columnPrefix || '' )
  // sets the max-width of the site
  style.define( '$site-width', opts.siteWidth || 80 )
  // set max width, in % or vw
  style.define( '$site-width-type', opts.widthType || '%' )
  // spacing between columns, margin or padding
  style.define( '$spacer', opts.spacer || 'margin' )
  // whether to put the margin/padding on the right or the left
  style.define( '$spacer-dir', opts.spacerDirection || 'right' )
  // unit type of spacing, defaults to percentage, can be any unit
  style.define( '$spacer-type', opts.spacerType || 'px' )
  // amount of spacing, number
  style.define( '$spacer-amount', opts.spacerAmount || 16 )
  // whether or not to include spacing on the bottom as well
  style.define( '$spacer-bottom', opts.spacerBottom || true )
  // generate mobile column classes (by default we do not, all columns are 100% on mobile)
  style.define( '$include-mobile', opts.includeMobile || true )
  // generate hide/show classes
  style.define( '$display-classes', opts.displayClasses || true )
  // generate remove/reveal classes
  style.define( '$display-overrides', opts.displayOverrides || true )
  // generate alpha classes
  style.define( '$column-alpha', opts.alpha || false )
  // generate omega classes
  style.define( '$column-omega', opts.omega || false )
  // generate push classes
  style.define( '$column-push', opts.push || false )
  // generate pull classes
  style.define( '$column-pull', opts.pull || false )

  // by default we don't generate gutters
  if ( typeof opts.gutters === 'object' ) {
    // if hard-coding gutters
    if ( opts.gutters.values ) {
      style.define( '$gutters', opts.gutters.values, true )
    }
    else {
      if ( opts.gutters.base ||
        opts.gutters.range ||
        opts.gutters.scale ) {
        // creates an array of gutters which we can use in stylus
        // generates based on a base value and a scale
        style.define( '$gutters', composeGutters( opts.gutters ), true )
      }
      else {
        // default gutters
        style.define( '$gutters', {
          0: 8,
          1: 16,
          2: 32,
          3: 64,
        }, true )
      }
    }

    // gutter variables, the margin and padding classes by breakpoint
    // gutter unit is the unit value for all gutters
    style.define( '$gutter-unit', opts.gutters.gutterUnit || 'px' )

    // below are values for auto generating gutters
    // the base gutter value, used as first gutter
    style.define( '$gutter-base', opts.gutters.base )
    // the number of gutter classes to create per direction per breakpoint
    style.define( '$gutter-range', opts.gutters.range )
    // the amount of increase for each gutter class
    style.define( '$gutter-scale', opts.gutters.scale )
  }
  else {
    // default gutters
    style.define( '$gutters', {
      0: 8,
      1: 16,
      2: 32,
      3: 64,
    }, true )
  }

  // directions hash, by default we generate
  // gutters for all 4 directions
  style.define( '$directions', {
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
  }, true )
}

module.exports = wiredStyle

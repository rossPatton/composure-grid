'use strict'


/**
 * Module dependencies.
 */
var stylus = require( 'stylus' )
var _ = require( 'lodash' )
var nodes = stylus.nodes


/**
 * Return the plugin callback for stylus.
 * @return {Function}
 * @api public
 */
var bootstrapGrid = function( style, opts ) {
  // by default we support flexbox
  var flexBox = true
  if ( opts.flexSupport === false ) {
    flexBox = false
  }

  // by default we don't include column padding
  var padding = false
  if ( opts.columnPadding ) {
    padding =  new nodes.Literal( opts.columnPadding )
  }

  var defaultBreakpoints = {
    xs: {
      max: 33.99,
      isMobile: true,
    },
    sm: {
      min: 34,
    },
    md: {
      min: 48,
    },
    lg: {
      min: 62,
    },
    xl: {
      min: 75,
    }
  }

  // these are the breakpoints we use to define the grid
  style.define( '$grid-breakpoints', opts.gridBreakpoints || defaultBreakpoints, true )
  style.define( '$media-unit', opts.mediaUnit || 'rem' )

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
  var unit = opts.mediaUnit || 'rem'
  var min = mob[0].max + 1
  var mobPlus = '( min-width: ' +  min + unit + ' )'
  style.define( '$mob-plus', mobPlus )

  // - GRID SETTINGS
  // how many columns to generate
  style.define( '$columns', opts.columns || 12 )
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
  style.define( '$column-prefix', opts.columnPrefix || 'col-' )
  // sets the max-width of the site
  style.define( '$site-width', opts.siteWidth || 72.25 )
  // set max width, in % or vw or em or rem
  style.define( '$site-width-type', opts.widthType || 'rem' )
  // spacing between columns, margin or padding
  style.define( '$spacer', opts.spacer || 'padding' )
  // whether to put the margin/padding on the right or the left or both
  style.define( '$spacer-dir', opts.spacerDirection || 'both' )
  // unit type of spacing, defaults to percentage, can be any unit
  style.define( '$spacer-type', opts.spacerType || 'px' )
  // amount of spacing, number
  style.define( '$spacer-amount', opts.spacerAmount || 15 )
  // whether or not to include spacing on the bottom as well
  style.define( '$spacer-bottom', opts.spacerBottom || false )
  // generate mobile column classes (by default we do not, all columns are 100% on mobile)
  style.define( '$include-mobile', opts.includeMobile || true )
  // generate hide/show classes
  style.define( '$display-classes', opts.displayClasses || true )
  // generate remove/reveal classes
  style.define( '$display-overrides', opts.displayOverrides || false )
  // generate alpha classes
  style.define( '$column-alpha', opts.alpha || true )
  // generate omega classes
  style.define( '$column-omega', opts.omega || true )
  // generate push classes
  style.define( '$column-push', opts.push || true )
  // generate pull classes
  style.define( '$column-pull', opts.pull || true )

  // directions hash, by default we generate
  // gutters for all 4 directions
  style.define( '$directions', {
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
  }, true )
}


module.exports = bootstrapGrid

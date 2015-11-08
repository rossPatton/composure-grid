'use strict'

var stylus = require( 'stylus' )

// default grid, 12 columns, 2 breakpoints 3 gutters hide/show, flexbox/order
var simpleGrid = require( './presets/simple' )

// optional presets
// WIRED style
// 18 columns 3 breakpoints 5 gutters hide/show remove/reveal, flexbox/order, col- prefix
var wiredStyle = require( './presets/WIRED' )

// bootstrap style
// 12 columns 5 breakpoints no gutters hide/show, flexbox/order, col- prefix
var bootStyle = require( './presets/bootstrap' )

// bootstrap style
// 12 columns 5 breakpoints no gutters hide/show, flexbox/order, col- prefix
var foundationStyle = require( './presets/foundation' )


/**
 * Return the plugin callback for stylus.
 * @return {Function}
 * @api public
 */
var composureGrid = function( opts ) {
  return function( style ) {
    style.include( __dirname )

    // if no opts passed in just create an empty obj
    if ( typeof opts !== 'object' ) {
      opts = {}
    }

    if ( opts.preset === 'WIRED'.toLowerCase() ) {
      return wiredStyle( style, opts )
    }

    if ( opts.preset === 'bootstrap' ) {
      return bootStyle( style, opts )
    }

    if ( opts.preset === 'foundation' ) {
      return foundationStyle( style, opts )
    }

    return simpleGrid( style, opts )
  }
}


exports = module.exports = composureGrid

// create an int8 array of gutters sizes
var gutters = function( opts ) {
  var range = ( opts.range || 3 ) | 0
  var base = ( opts.base || 10 ) | 0
  var scale = ( opts.scale || 2 ) | 0

  var i = 0 | 0
  var gutters = new Int16Array(range)

  while ( i <= range ) {
    if ( i === 0 ) {
      gutters[i] = base
    }
    else {
      gutters[i] = gutters[i - 1] * scale
    }

    i++
  }

  return gutters
}

module.exports = gutters

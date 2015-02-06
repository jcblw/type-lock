
'use strict';

module.exports = lock
module.exports.lock = lock
module.exports.lockKey = lockKey

function lockKey( key, value, obj ) {
   Object.defineProperty( obj, key, {
       get: function() {
           return value;
       },
       set: function( input ) {
           if ( typeof value === typeof input && Array.isArray( value ) === Array.isArray( input ) ) {
               value = input;
               return value;
           }
           throw new Error( 'Cannot set property ' + key + ' it has been locked to the type ' + ( typeof key ) )
       }
   } )
}

function lock( obj, override ) {
    if ( typeof obj !== 'object' || !obj ) {
        throw new Error( 'Cannot lock argument with the type of ' + ( typeof obj ) )
    }

    var ret

    if ( override ) {
        ret = obj
    } else {
        ret = {}
    }

    for ( var key in obj ) {
        lockKey( key, obj[ key ], ret )
    }

    return ret
}

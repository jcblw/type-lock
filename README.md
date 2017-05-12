# Type Lock

[![Greenkeeper badge](https://badges.greenkeeper.io/jcblw/type-lock.svg)](https://greenkeeper.io/)

Locks an objects properties to a specific type

[![Build Status](https://travis-ci.org/jcblw/type-lock.svg?branch=master)](https://travis-ci.org/jcblw/type-lock)

## Usage

```javascript
var typeLock = require( 'type-lock' ),
    obj = {
        foo: 'bar',
        baz: true 
    },
    obj2 = typeLock( obj ) // returns new copy

typeLock( obj, true ) // locks exsisting object

obj.foo // 'bar' intial value
obj.foo = 'baz' // 'baz' returns back set value
obj.foo = true // throws cannot set property foo
obj.baz = 'bar' // throws cannot set property baz

// lock only one key
typeLock.lockKey( key, value, object );
```


var test = require( 'tape' ),
    lockType = require( '..' );

test( 'testing lockType.lockKey', function( t ) {
    var foo = {}
    t.equals( typeof lockType.lockKey, 'function', 'lockType.lockKey is a function' );
   
    function setBadKey () {
        foo.bar = true
    }

    lockType.lockKey( 'bar', 'baz', foo )

    t.equals( foo.bar, 'baz', 'The correct value is returned from foo.bar after the key has been locked' )
    foo.bar = 'qux'
    t.equals( foo.bar, 'qux', 'The correct value is returned from foo.bar after the key has been locked the changed to a similiar type' )
    t.throws( setBadKey, 'When tryng to set a key that has a differnt type then the initial key an error will be thrown' )
    t.end()
} )

test( 'testing lockType.lock', function( t ) {
    var foo = {
            foo: 'bar',
            baz: 'qux',
        },
        bar = lockType.lock( foo ),
        baz = lockType.lock( foo, true );

    function setBadKey( key ) {
        foo[ key ] = true;
    }

    t.equals( typeof bar, 'object', 'When an object is passed into lockType.lock a object is returned' );
    bar.foo = 'baz';
    t.notEqual( bar.foo, foo.foo, 'When lockType.lock is called on an object with not other arguments a new object is returned' );
    baz.foo = 'qux';
    t.equals( baz.foo, foo.foo, 'When lockType.lock is called on an object with another argument that is truthy the original object is returned and locked' );
    t.throws( setBadKey.bind( null, 'foo' ), 'When a bad key is set the object with throw' );
    t.throws( setBadKey.bind( null, 'baz' ), 'When a bad key is set the object with throw on all keys on object' );
    t.throws( lockType.lock.bind( null, true ), 'When lockType.lock is passed something other then an object it will throw' );
    t.end();
} );

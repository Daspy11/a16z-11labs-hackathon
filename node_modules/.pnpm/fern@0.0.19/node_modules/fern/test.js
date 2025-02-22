var test = require('tape')
var util = require('util')
var fern = require('./index.js')

// TREES TO TEST

var fakeTree = 'I am a string not a tree!'

var badTree = {
  string: 'not a function',
  ugFun: function () {
    // function without any params!
  }
}

var goodTree = {
  inc: function (d, emit) {
    d.num++
    emit(d)
  },
  dec: function (d, emit) {
    d.num--
    emit(d)
  },
  log: function (d) {
    console.log(d.msg)
  }
}


// TESTS

test('Calling Fern returns a Stream', function (t) {
  var Stream = require('stream')
  var shrub = fern(goodTree)
  t.equal(shrub instanceof Stream, true)
  t.end()
})

test('Throw Error on wrong arguments', function (t) {
  try {
    var vinylFern = fern(fakeTree)
  } catch (e) {
    t.equal(e.name, 'Error')
  }
  try {
    var stinkWeed = fern(badTree)
  } catch (e) {
    t.equal(e.name, 'Error')
  }
  try {
    var weed = fern(goodTree, {clump:'fake opt', moss: ['not correct input', 4]})
  } catch (e) {
    t.equal(e.name, 'Error')
  }
  try {
    var weed = fern(goodTree, 'oo')
  } catch (e) {
    t.equal(e.name, 'Error')
  }
  t.end()
})

test('Write good data to default Fern', function (t) {
  var i = 0
  var tree = {
    inc: function (d) {
      i = d.num
     },
     dec: function (d, cb) {
       d.num--
       cb(d)
     }
   }
 var f = fern(tree)
 f.on('data', function (d) {
   t.equal(d.num,4)
   t.end()
 })
 f.write({type:'inc',num:3})
 t.equal(i,3)
 f.write({type:'dec',num:5})
})

test('Write good data to custom Fern', function (t) {
  t.plan(2)
  var i = 0
  var tree = {
    inc: function (d) {
      i = d.num
     },
     dec: function (d, cb) {
       d.num--
       cb(d)
     }
   }
 var f = fern(tree, {filter:'k',sep:':',pos:1})
 f.on('data', function (d) {
   t.equal(d.num,4)
 })
 f.write({k:'x:inc',num:3})
 f.write({k:'y:dec',num:5})
 t.equal(i,3)
})

test('Write bad object to default Fern', function (t) {
  var f = fern(goodTree)
  f.on('error', function (e) {
    t.equal(e.name, 'Error')
    t.end()
  })
  f.write({fake:'obj'})
})

test('Write string to default Fern', function (t) {
  var f = fern(goodTree)
  f.on('error', function (e) {
    t.equal(e.name, 'Error')
    t.end()
  })
  f.write('string')
})

test('Write bad data to custom Fern', function (t) {
  t.plan(4)
  var f = fern(goodTree, {filter:'k', sep:':', pos:1})
  f.on('error', function (e) {
    t.equal(e.name, 'Error')
  })
  f.write('junk')
  f.write({bad:'obj'})
  f.write({k:'inc:blam',num:9})
  f.write({k:'inc|blam',num:0})
})

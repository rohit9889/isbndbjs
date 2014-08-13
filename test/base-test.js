var ISBNDB = require('../lib/index.js')
var assert = require('assert')

ISBNDB.initialize("A9QB4LCQ")
var isbn13 = '9780743294065'

ISBNDB.Books.get(isbn13, function(responseBody){
  assert.equal(responseBody.data[0].isbn13, isbn13, 'The 13-digit ISBN code must match');
})

var search = {
  query: "Mario Livio",
  type: "author_name"
}

ISBNDB.Books.search(search, function(responseBody){
  assert.equal(responseBody.data[0].isbn10, '3406605958', 'The 10-digit ISBN code must match');
})
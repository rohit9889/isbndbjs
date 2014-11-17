var ISBNDB = require('../lib/index.js')
var assert = require('assert')

ISBNDB.initialize("A9QB4LCQ")
var isbn13 = '9780743294065'

var bookData
ISBNDB.Books.get(isbn13)
.then(function(bookData){
  assert.equal(bookData.isbn13, isbn13, 'The 13-digit ISBN code must match')
  return bookData.getAuthor()
})
.then(function(author){
  assert.equal(author.book_count, 43, 'Author retrieval failed')
  return author.getAllBooks()
})
.then(function(books){
  assert.equal(books.length, 10, 'Book retrieval failed')
})
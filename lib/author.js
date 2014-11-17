var API = require('./api')

module.exports = (function(){
  Author = function(authorAttrs){
    var that = this
    for(var attrKey in authorAttrs){
      that[attrKey] = authorAttrs[attrKey]
    }

    return that
  }

  /*
    ------------------------------------------------------------------------------
    ---------------------- DECLARING STATIC FUNCTIONS ----------------------------
    ------------------------------------------------------------------------------
  */

  Author.initializeAuthorObject = function(attrs){
    return new Author(attrs)
  }

  Author.initializeAuthorObjects = function(arrayOfAuthors){
    var that    = this
    var objects = []
    arrayOfAuthors.forEach(function(authorAttrs){
      objects.push(that.initializeAuthorObject(authorAttrs))
    })

    return objects
  }

  Author.get = function(authorId, success, failure){
    var that     = this
    var deferred = ISBNDB.Promise.defer()
    var path     = "/author/" + authorId

    API.sendRequestToISBNDB(path)
    .then(function(responseBody){
      responseBody = (responseBody.data && responseBody.data[0]) || {}
      var authorObject = that.initializeAuthorObject(responseBody)
      if(typeof(success) == 'function'){ success(authorObject) }
      deferred.resolve(authorObject)
    }, function(errorResponseObject){
      if(typeof(failure) == 'function'){ failure(errorResponseObject) }
      deferred.reject(errorResponseObject)
    })

    return deferred.promise
  }

  Author.search = function(query, success, failure){
    var that       = this
    var deferred   = ISBNDB.Promise.defer()

    if(query){
      var path = "/authors?q=" + query

      API.sendRequestToISBNDB(path)
      .then(function(responseBody){
        var authorObjects = that.initializeAuthorObjects(responseBody.data)
        if(typeof(success) == 'function'){ success(authorObjects) }
        deferred.resolve(authorObjects)
      }, function(errorResponseObject){
        if(typeof(failure) == 'function'){ failure(errorResponseObject) }
        deferred.reject(errorResponseObject)
      })
    } else {
      that.throwInvalidSearchTermException()
    }

    return deferred.promise
  }

  Author.throwInvalidSearchTermException = function(){
    throw new Error("Please send a valid search term.")
  }

  Author.validSearchType = function(searchType){
    var types = [
      "author_id", "author_name", "publisher_id", "publisher_name", "book_summary", 
      "book_notes", "dewey", "lcc", "combined", "full"
    ]

    return (types.indexOf(searchType) >= 0)
  }
  /*
    ------------------------------------------------------------------------------
    ---------------------- STATIC FUNCTIONS COMPLETE -----------------------------
    ------------------------------------------------------------------------------
  */

  /*
    ------------------------------------------------------------------------------
    ---------------------- DECLARING INSTANCE FUNCTIONS ----------------------------
    ------------------------------------------------------------------------------
  */

  Author.prototype.getName = function(){
    return this.first_name + this.last_name
  }

  Author.prototype.numberOfBooks = function(){
    return this.book_count
  }

  Author.prototype.getAllBooks = function(success, failure){
    var that     = this
    var deferred = ISBNDB.Promise.defer()

    var bookSearchPromise = ISBNDB.Books.search({
      query: that.author_id,
      type: 'author_id'
    })

    bookSearchPromise.then(function(bookObjects){
      if(typeof(success) == 'function'){ success(bookObjects) }
      deferred.resolve(bookObjects)
    }, function(errorResponseObject){
      if(typeof(failure) == 'function'){ failure(errorResponseObject) }
      deferred.reject(errorResponseObject)
    })

    return deferred.promise
  }

  /*
    ------------------------------------------------------------------------------
    ---------------------- INSTANCE FUNCTIONS COMPLETE -----------------------------
    ------------------------------------------------------------------------------
  */
  return Author
}).call(API)
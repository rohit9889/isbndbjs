var API = require('./api')

module.exports = (function(){
  Book = function(bookAttrs){
    var that = this
    for(var attrKey in bookAttrs){
      that[attrKey] = bookAttrs[attrKey]
    }

    return that
  }

  /*
    ------------------------------------------------------------------------------
    ---------------------- DECLARING STATIC FUNCTIONS ----------------------------
    ------------------------------------------------------------------------------
  */

  Book.initializeBookObject = function(attrs){
    return new Book(attrs)
  }

  Book.initializeBookObjects = function(arrayOfBooks){
    var that    = this
    var objects = []
    arrayOfBooks.forEach(function(bookAttrs){
      objects.push(that.initializeBookObject(bookAttrs))
    })

    return objects
  }

  Book.get = function(isbnOrBookId, success, failure){
    var that     = this
    var deferred = ISBNDB.Promise.defer()
    var path     = "/book/" + isbnOrBookId

    API.sendRequestToISBNDB(path)
    .then(function(responseBody){
      responseBody = (responseBody.data && responseBody.data[0]) || {}
      var bookObject = that.initializeBookObject(responseBody)
      if(typeof(success) == 'function'){ success(bookObject) }
      deferred.resolve(bookObject)
    }, function(errorResponseObject){
      if(typeof(failure) == 'function'){ failure(errorResponseObject) }
      deferred.reject(errorResponseObject)
    })

    return deferred.promise
  }

  Book.search = function(options, success, failure){
    var that       = this
    var deferred   = ISBNDB.Promise.defer()
    var searchTerm = options.query
    var searchType = options.type

    if(searchTerm){
      if(searchType && this.validSearchType(searchType)){
        var path = "/books?q=" + searchTerm + "&i=" + searchType
      } else {
        var path = "/books?q=" + searchTerm
      }

      API.sendRequestToISBNDB(path)
      .then(function(responseBody){
        var bookObjects = that.initializeBookObjects(responseBody.data)
        if(typeof(success) == 'function'){ success(bookObjects) }
        deferred.resolve(bookObjects)
      }, function(errorResponseObject){
        if(typeof(failure) == 'function'){ failure(errorResponseObject) }
        deferred.reject(errorResponseObject)
      })
    } else {
      that.throwInvalidSearchTermException()
    }

    return deferred.promise
  }

  Book.throwInvalidSearchTermException = function(){
    throw new Error("Please send a valid search term.")
  }

  Book.validSearchType = function(searchType){
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

  Book.prototype.getAuthor = function(){
    var that           = this
    var deferred       = ISBNDB.Promise.defer()
    var bookAuthorData = that.author_data

    if(bookAuthorData.length == 1){
      var authorID = bookAuthorData[0].id
      return ISBNDB.Author.get(authorID)
    } else if(bookAuthorData.length > 1){
      
    } else {
      deferred.reject({'error': 'No author data found'})
    }

    return deferred.promise
  }

  Book.prototype.getPublisher = function(){
    // TODO: Get Publisher Data
  }



  /*
    ------------------------------------------------------------------------------
    ---------------------- INSTANCE FUNCTIONS COMPLETE -----------------------------
    ------------------------------------------------------------------------------
  */
  return Book
}).call(API)
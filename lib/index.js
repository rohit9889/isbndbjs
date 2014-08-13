var ISBNDB = {
  initialize: function(apiKey){
    if(apiKey && typeof(apiKey) == 'string'){
      this.apiKey = apiKey
      this.API.basePath = this.API.basePath + String(apiKey)
    } else {
      this.throwApiKeyMissingException()
    }
  },

  throwApiKeyMissingException: function(){
    throw new Error("Please initialize with a valid API Key.")
  }
}

ISBNDB.API   = require('./api')
ISBNDB.Books = {
  get: function(isbnOrBookId, success, failure){
    var path = "/book/" + isbnOrBookId
    ISBNDB.API.sendRequest(path, success, failure)
  },

  search: function(options, success, failure){
    var searchTerm = options.query
    var searchType = options.type

    if(searchTerm){
      if(searchType && this.validSearchType(searchType)){
        var path = "/books?q=" + searchTerm + "&i=" + searchType
      } else {
        var path = "/books?q=" + searchTerm
      }

      ISBNDB.API.sendRequest(path, success, failure)
    } else {
      this.throwInvalidSearchTermException()
    }
  },

  throwInvalidSearchTermException: function(){
    throw new Error("Please send a valid search term.")
  },

  validSearchType: function(searchType){
    var types = [
      "author_id", "author_name", "publisher_id", "publisher_name", "book_summary", 
      "book_notes", "dewey", "lcc", "combined", "full"
    ]

    return (types.indexOf(searchType) >= 0)
  }
}

module.exports = ISBNDB
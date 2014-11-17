ISBNDB = {
  initialize: function(apiKey){
    if(apiKey && typeof(apiKey) == 'string'){
      this.apiKey = apiKey
      this.API.basePath = this.API.basePath + String(apiKey)
    } else {
      throwApiKeyMissingException()
    }
  }
}

var throwApiKeyMissingException = function(){
  throw new Error("Please initialize with a valid API Key.")
}

ISBNDB.API     = require('./api')
ISBNDB.Books   = require('./book')
ISBNDB.Author  = require('./author')
ISBNDB.Promise = require('q')

module.exports = ISBNDB
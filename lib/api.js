var request = require('request')

var API = {
  basePath: "http://isbndb.com/api/v2/json/",

  sendRequestToISBNDB: function(path){
    var deferred = ISBNDB.Promise.defer()
    var url      = this.basePath + path

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        deferred.resolve(JSON.parse(body))
      } else {
        deferred.reject(response)
      }
    })

    return deferred.promise
  }
}

module.exports = API
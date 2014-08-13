var request = require('request')

var API = {
  basePath: "http://isbndb.com/api/v2/json/",

  sendRequest: function(path, success, failure){
    var url = this.basePath + path
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        success(JSON.parse(body))
      } else {
        failure(response)
      }
    })
  }
}

module.exports = API
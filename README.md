# isbndbjs

An SDK for retrieving data from [ISBNDB]


### Features

* Get a particular book using its 10-Digit ISBN, 13-Digit ISBN, or its internal ISBNDB book_id
* Search books by title, author, ISBN number etc.


### Install

    npm install isbndbjs
    
### Usage

First of all you will have to initialize the SDK using the API Key, which can be obtained after you [create an account][1] and then go to [access keys manager][2].

    var ISBNDB = require('isbndb')
    ISBNDB.initialize("YOUR_API_KEY_HERE")

Now, you can use the API as desired. For instance, if you want to search the book "Is God a Mathematician?" whose 13-Digit ISBN number is "9780743294065", it can be done using:

    ISBNDB.Books.get("9780743294065", function(responseBody){
      // .... successful response callback
    }, function(errorResponse){
      // .... error callback
    })

### Issues and Suggestions

Please report all the issues in the Github Issues Page, suggestions are also welcome. You can also mail me at rohit0981989[at]gmail[dot]com for the same.

### Future Modifications

* Addition of Authors API
* Addition of Publishers API
* Addition of Categories API
* Addition of Subjects API
* Change from Callback to Promises

[isbndb]: http://isbndb.com
[1]: http://isbndb.com/account/create.html
[2]: http://isbndb.com/account/dev/keys/
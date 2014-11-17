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

##### Books API
If you know the ISBN number of a particular book, you can get the book directly, as illustrated

    ISBNDB.Books.get("9780743294065", function(responseBody){
      // .... successful response callback
    }, function(errorResponse){
      // .... error callback
    })

    // .... Or, you could use the promise implementation in the following manner. Promise based examples will be used from here on

    ISBNDB.Books.get("9780743294065")
    .then(function(bookData){
      // .... Play with book data here
    }, function(errorObject){
      // .... Handle errors here
    })

You can also get the data of the author of a book
    ISBNDB.Books.get("9780743294065")
    .then(function(bookData){
      return bookData.getAuthor()
    })
    .then(function(authorData){
      // .... Play with author data here
    })

If you desire to search books written by Shakespeare, it can be done in the following manner.

    ISBNDB.Books.search({query: 'William Shakespeare', type: 'author_name'})
    .then(function(books){
      // .... A list of books published by William Shakespeare
    }, function(errorObject){
      // .... Handle errors here
    })

##### Authors API
If you know the `author_id` for any author, you can directly get the author data as below:

    ISBNDB.Author.get('richards_rowland')
    .then(function(authorData){
      // Play with author data
    }, function(errorObject){
      // .... Handle errors here
    })

You can also search for authors as shown below:

    ISBNDB.Author.search('william')
    .then(function(authors){
      // An array of authors
    }, function(errorObject){
      // .... Handle errors here
    })

### Issues and Suggestions

Please report all the issues in the Github Issues Page, suggestions are also welcome. You can also mail me at rohit0981989[at]gmail[dot]com for the same.

### Future Modifications

* Addition of Publishers API
* Addition of Categories API
* Addition of Subjects API

[isbndb]: http://isbndb.com
[1]: http://isbndb.com/account/create.html
[2]: http://isbndb.com/account/dev/keys/

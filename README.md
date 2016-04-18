#Simple-Syrvup Documentation

This small framework allows for server creation with easier settings for GET and POST endpoints.

##Installation

To install this package:

```
npm init
npm install simple-syrvup
```

To use Simple-Syrvup:
```
var syrvup = require('simple-syrvup');
```

##Starting Server

To start the server, first set the port:
```
syrvup.port = <enter port value>
```
```
syrvup.server.listen(syrvup.port, () => {
  process.stdout.write('Server is running at localhost:' + syrvup.port + '\n');
});
```

##Setting Up Routes

Simple-Syrvup allows the creation of multiple requests to endpoints through the creation of arrays.

###GET Routes

Simple-Syrvup allows the user to set an array of objects to set the GET endpoints.
The GET endpoints allow server to return text, an HTML file, or a callback function.

To set GET endpoints, in your server.js file, the command is:
```
syrvup.getEndpoints(getArray);
```

The array of objects are in the form:
```
var getArray =
[
  { url: '/', content: <sample text> },
  { url: '/test', content: <path to HTML file> },
  { url: '/another', content: <Callback function> }
]
```

Example of text:
```
'this is sample text'
```

Example of path to HTML (this file is your creation)
```
__dirname + '/index.html'
```

Example of a callback function:
```
function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('yay');
  res.end();
};
```

###POST Routes

Simple-Syrvup also allows the user to set an array of objects for their POST endpoints.
The POST endpoints allow the user to save the POST in JSON format at a specified location.

If no file exists at the saveLocation, a file titled "postData.json" will be created. The directory must be already created by the user.

To set POST endpoints, the command is:
```
syrvup.postEndpoints(postArray);
```

The endpoint object is in the following format:
```
var postArray =
[
  { url: '/', saveLocation: <directory> },
  { url: '/another-location', saveLocation: </../data/> }
]
```

The sample JSON file would contain this to begin:
```
{"count":"0"}
```

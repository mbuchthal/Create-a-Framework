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

To start the server:

```
syrvup.server.listen(syrvup.port, () => {
  process.stdout.write('Server is running at localhost:' + syrvup.port + '\n');
});
```
Default port will be set to 5000.
Users can optionally set their port to replace 'syrvup.port'.

##Setting Up Routes

Simple-Syrvup allows the creation of multiple requests to endpoints through the creation of arrays.

###GET Routes

Simple-Syrvup allows the user to set an array of objects to set the GET endpoints.
The GET endpoints allow server to return text, an HTML file, or a callback function.

To set GET endpoints, the command is:
```
syrvup.getEndpoints(_array_);
```

The array of objects are in the form:
```
[
  { url: '/', content: _'sample text'_ },
  { url: '/test', content: _path to HTML file_ },
  { url: '/another', content: _Callback function_ }
]
```

###POST Routes

Simple-Syrvup also allows the user to set an array of objects for their POST endpoints.
The POST endpoints allow the user to save the POST in JSON format at a specified location.

To set POST endpoints, the command is:
```
syrvup.postEndpoints(_array_);
```

The endpoint object is in the following format:
```
[
  { url: '/', saveLocation: _file_location_ },
  { url: '/another_location, saveLocation: _/../data/all-data.json_ }
]
```

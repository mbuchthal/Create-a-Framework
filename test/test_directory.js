
const fs = require('fs');

function checkDirectory(directory) {
  fs.stat(directory, (err) => {
    if (err) {
      fs.mkdir(directory);
      fs.writeFileSync(__dirname + '/../data/postData.json', '{"count":"0"}');
      return console.log('made directory');
    }
  console.log('dir exists');
  });
}

checkDirectory('./data/');

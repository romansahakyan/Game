const fs = require("fs");
fs.readFile("Game/index.html","utf8",
 function(err, data) {
   console.log(data);
 });
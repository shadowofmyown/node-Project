const path = require('path');
console.log("nis",path.dirname(require.main.filename))
module.exports = path.dirname(require.main.filename);
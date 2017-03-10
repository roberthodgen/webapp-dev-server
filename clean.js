var del = require('del');
var _ = require('lodash');
var colors = require('colors');


del([
  './webapps/**',
  '!./webapps',
  '!./webapps/.gitignore'
]).then(function (paths) {
  _.each(paths, function (path) {
    console.log(colors.magenta.bold('Deleted ') + colors.underline(path));
  });

  console.log('\n' + paths.length + ' files cleaned :)\n');
});

/**
 * # Convert Release.json to Changes.md
 *
 * @param  {Array}  data The releases from Github's API
 * @param  {String} out  Changelog filename
 * @return {Stream} The file write stream
 */

var fs = require('fs');

module.exports = function (data, out) {
  var output = fs.createWriteStream(out);

  output.on('open', function () {
    output.write('# Changelog' + '\n\n');
    data.forEach(function (release) {
      output.write('## '+ release.name + '\n\n');
      output.write( (new Date(release.published_at)).toDateString() + '\n\n');
      output.write(release.body.replace('\r\n', '\n') + '\n\n');
    });
    output.end();
  });

  return output;
};
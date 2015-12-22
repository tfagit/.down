var fs = require('fs');
var path = require('path');
var format = require('string-format');

/**
 * Obtains the files and directories inside a given directory together with
 * stats about them. Calls a callback with the following protocol:
 *
 * function callback(err, contents)
 *
 * Contents is an object which contains two lists: files and dirs. Both of them
 * contain objects with data about the files/directories inside the read direc-
 * tory.
 *
 * @param {string} dir_path Path to the directory to be read.
 * @param {function} callback Callback to be called from inside the function.
 */
function getDirContents(dir_path, callback) {
    fs.readdir(dir_path, function(err, contents){
        if (err) return callback(err);
        dirs = [];
        files = [];
        contents.forEach(function(val){
            var stats = fs.statSync(path.join(dir_path, val));
            var item_data = {
                name: val,
                path: path.join(dir_path, val),
                size: stats.size,
                lastmod: {
                    date: stats.mtime,
                    iso: stats.mtime.toISOString()
                }
            };
            if (stats.isFile())
                files.push(item_data);
            else if (stats.isDirectory())
                dirs.push(item_data);
        });
        callback(null, {
            dirs: dirs,
            files: files
        });
    });
}

function addDownloadCommands(item_data, url_no_query){
    var cmd_fmts = {
        wget: 'wget -r --no-parent "{0}"'
    }

    // Removes search portion, if existing
    var url = item_data.url = path.join(url_no_query, item_data.name);

    for (var key in cmd_fmts){
        if (cmd_fmts.hasOwnProperty(key)){
            item_data[key] = format(cmd_fmts[key], url);
        }
    }
}

module.exports = {
    getDirContents: getDirContents,
    addDownloadCommands: addDownloadCommands
};

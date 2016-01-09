var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');
var nconf = require('nconf');
var dir = require('../lib/dir.js');

var index_dir = nconf.get('index_dir');
var physical_path = path.join(__dirname, "..", index_dir);

router.use(express.static(physical_path));

router.get('/', function(req, res, next) {
    dir.getDirContents(physical_path, function(err, contents){
        if (err) {
            var err = new Error("File directory doesn't exist, 404. (Alert the admin!)");
            err.status = 404;
            return next(err);
        }
        var url_with_host = "http://" + req.headers.host + req.url;
        dir.addCommandsToContents(contents, url_with_host);
        res.render('index', {
            title: '.down',
            files: contents.files,
            dirs: contents.dirs,
            url_prefix: '',
            rel: dir.relUrl
        });
    });
});

router.get('*', function(req, res, next) {
    var pathname = url.parse(req.url).pathname;
    var dir_path = path.join(physical_path, pathname);
    dir.getDirContents(dir_path, function(err, contents){
        if (err) {
            var err = new Error("There's no such directory, 404.");
            err.status = 404;
            return next(err);
        }
        var url_with_host = path.join("http://" + req.headers.host, req.url);
        dir.addCommandsToContents(contents, url_with_host);
        res.render('dir', {
            title: pathname + ' - .down',
            files: contents.files,
            dirs: contents.dirs,
            url_prefix: '',
            rel: dir.relUrl
        });
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var path = require('path');
var dir = require('../lib/dir.js');
var url = require('url');

var nconf = require('nconf');

var index_dir = nconf.get('index_dir');
var physical_path = path.join(__dirname, "..", index_dir);

router.use(express.static(physical_path));

router.get('/', function(req, res, next) {
    dir.getDirContents(physical_path, function(err, contents){
        if (err) {
            var err = new Error("There's no such directory, 404.");
            err.status = 404;
            return next(err);
        }
        res.render('index', {
            title: '.down',
            files: contents.files,
            dirs: contents.dirs,
            url_prefix: ''
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
        res.render('dir', {
            title: pathname + ' - .down',
            files: contents.files,
            dirs: contents.dirs,
            url_prefix: ''
        });
    });
});

module.exports = router;
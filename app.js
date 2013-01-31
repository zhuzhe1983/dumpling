/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http')
    , YuiComboHandler = require('express-yuicombo').YuiComboHandler
    , path = require('path');

var app = express();

app.configure(function () {
    var sign = __dirname.indexOf('\\nodejs') != -1 ? '\\' : '/';
    var dir = path.join(__dirname.split(sign + 'nodejs')[0], '');

    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());

    app.use(express.directory(dir));
    app.use(express.static(dir));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/combo', YuiComboHandler('.'));

app.get('/:page?', function (req, res) {
    var page = req.route.params.page;
    console.log(page);
    if (page == '') {
        page = 'index';
    }
    console.log(page);
    res.render(page,
        { title:page }
    )
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

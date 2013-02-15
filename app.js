/**
 * Module dependencies.
 */

var express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , YuiComboHandler = require('express-yuicombo').YuiComboHandler
    , io = require('socket.io').listen(server)
    , path = require('path')
    , mongodb = require('mongodb')
    , db_server = mongodb.Server('localhost',27017,{auto_reconnect:true})
    , db_connect = mongodb.Db('test', db_server);


app.configure(function () {
    var sign = __dirname.indexOf('\\nodejs') != -1 ? '\\' : '/';
    var dir = path.join(__dirname.split(sign + 'nodejs')[0], '');

    app.set('port', process.env.VMC_APP_PORT || 80);

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
    app.use(express.errorHandler());
});

server.listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});

app.get('/combo', YuiComboHandler('.'));

app.get('/:page?', function (req, res) {
    var page = req.route.params.page;
    if (page == '') {
        page = 'index';
    }
    res.render(page,
        { title:page }
    )
});

app.get('/api',function(req,res){

});

db_connect.open(function (err, db) {
    if (err) {
        console.log(err);
    }else{
        console.log('mongodb connected:');
    }
});

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log('my other event');
        console.log(data);
    });

    socket.on('db', function (data) {
        console.log(data);
        var db = data.db;
        var action = data.action;
        var info = data.info;
        var find = data.find;
        var callback = data.callback;
        delete(data.callback);

        console.log([action,db,info,find]);

        db_connect.createCollection(db, {safe:true}, function (err, collection) {
            if (err) {
                console.log(err);
                return;
            }

            if(action == 'select'){
                collection.find(find, function(err, cursor) {
                    cursor.toArray(function(err, items) {
                        socket.emit(callback, items);
                    });
                });
            }else if(action == 'insert'){
                collection.insert(info, function(err, objects) {
                    if (err){
                        console.warn(err.message);
                        socket.emit('warn', [data,err]);
                    }else{
                        console.log('successfully insert');
                        socket.emit(callback, objects);
                        //socket.emit('log', ['insert',objects]);
                    }
                });
            }else if(action == 'update'){
                collection.update(find, info, {safe:true},function(err) {
                    if (err){
                        console.warn(err.message);
                        socket.emit('warm', [data,err]);
                    }else{
                        console.log('successfully updated');
                        socket.emit('log', "successfully updated");
                    }
                });
            }else if(action == 'delete'){
                collection.find(find,function(err,cursor){
                    socket.emit('log', ['delete',cursor]);
                });
            }else if(action == 'delete_confirm'){
                collection.remove(find,true);
            }else{
                socket.emit('warm', 'wrong action');
            }
        });
    });
});

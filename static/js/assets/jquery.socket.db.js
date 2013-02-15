/**
 * Created with JetBrains PhpStorm.
 * User: zhuzhe
 * Date: 2/10/13
 * Time: 1:55 PM
 * To change this template use File | Settings | File Templates.
 */

var socketID = 0;

(function (){
    if(!window.socket){
        window.socket = $.socket();
    }

    function db(db_name, action, info, find, func){
        if(typeof info == "function"){
            func = info;
        }

        if(typeof find == "function"){
            func = find;
        }

        if((action == 'select' || action == 'delete_confirm' || action == 'delete') && typeof info == 'object'){
            find = info;
        }

        console.log([db_name, action, info, find, func]);
        var callbackID = socketID++;
        socket.emit('db', { callback:callbackID, db:db_name, action:action, find: find, info:info });
        socket.on(callbackID,function(data){
            console.log(['callback',data]);
            func(data);
        });
    }

    $.db = db;
})();
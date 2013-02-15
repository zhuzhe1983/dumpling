/**
 * Created with JetBrains PhpStorm.
 * User: zhuzhe
 * Date: 2/10/13
 * Time: 1:55 PM
 * To change this template use File | Settings | File Templates.
 */

(function (){
    if(!window.socket){
        window.socket = socket();
    }

    function socket(host,protocol){
        if(typeof host == 'undefined'){
            host = document.location.host;
        }

        if(typeof protocol == 'undefined'){
            protocol = document.location.protocol;
        }

        io.transports = ["xhr-polling"]; //appfog don't support websocket

        socket = io.connect(protocol+'//'+host);
        return socket;
    }

    $.socket = socket;
})(jQuery);



/*
 socket.on('news', function (data) {
 console.log(data);
 socket.emit('db', { action:'select', db:'foo', data: 'data' });
 });
 socket.on('alert',function (data){
 alert(data['content']);
 });
 socket.on('log',function (data){
 console.log(data);
 });
 socket.on('warn',function (data){
 console.warn(data);
 });
 */

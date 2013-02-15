/**
 * Created with JetBrains PhpStorm.
 * User: zhuzhe
 * Date: 2/10/13
 * Time: 1:55 PM
 * To change this template use File | Settings | File Templates.
 */

(function ($){
    $.util = {
        'str_select':function(arr,key,value){
            var html = '<select key="type">';
            for(var i=0;i<arr.length;i++){
                var option = "<option value='"+arr[i].value+"'";
                if(arr[i].value == value){
                    option += "selected";
                }
                option += ">" + arr[i].label + "</option>";
                html += option;
            }
            html += '</select>';
            return html;
        }
    };
})(jQuery);
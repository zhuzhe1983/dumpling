/**
 * Created with JetBrains PhpStorm.
 * User: zhuzhe
 * Date: 2/12/13
 * Time: 3:33 AM
 * To change this template use File | Settings | File Templates.
 */
(function (){
    var select_type = [{label:'三全',value:1},{label:'湾仔',value:2}];

    function init(){
        var tr_insert = '<tr><td><input key="name" /></td><td><select key="type"><option value="三全">三全</option><option value="湾仔">湾仔</option></select></td><td><input key="price" type="number" class="span1"><span>元/份</span></td><td><input value="新增" type="button" class="J_new"></td></tr>';
        $.db('stock','select',function(data){
            var html = '';
            for(var i=0;i< data.length;i++){
                data[i]['sid'] = data[i]['_id'];
                var stock = data[i];
                var tr_stock = str_tr(stock);
                    html += tr_stock;
            }
            $('tbody:first').html(html);
            $('tbody.new').html(tr_insert);
        });
    }

    function str_tr(stock){
        return '<tr _id="'+stock._id+'"><td><input key="name" value="'+stock.name+'"></td><td>'+ $.util.str_select(select_type,'type',stock.type)+'</td><td><input key="price" value="'+stock.price+'" type="number" class="span1"><span>元/份</span></td><td><input value="更新" class="J_update" type="button"><input value="删除" class="J_delete" type="button"></td></tr>';
    }

    $("table").delegate("input[type='button']",'click',function(){
        var tr = $(this).parents('tr');
        var name = tr.find("[key='name']");
        var type = tr.find("[key='type']");
        var price = tr.find("[key='price']");
        var _id = tr.attr('_id');
        var stock = {name:name.val(),type:type.val(),price:price.val()};
        console.log([tr,name,type,price]);
        if($(this).hasClass('J_new')){
            $.db('stock','insert',stock,function(data){
                name.add(price).val('');
                stock._id = data[0]._id;
                $('tbody:first').append(str_tr(stock));
            });
        }else if($(this).hasClass('J_update')){
        }else if($(this).hasClass('J_delete')){
            $.db('stock','delete_confirm',{_id:_id},function(data){
                console.log(data);
                $("table tr[_id='"+_id+"']").remove();
            });
        }
    });

    init();
})();
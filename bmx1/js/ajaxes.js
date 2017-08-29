function ajax(_url, suc_func)
{
	return $.ajax({
			    url: _url,
			    dataType: 'jsonp',
			    jsonp:'callback',          //jsonp请求方法
			    data: {},
			    cache:false,
			    type:'GET',
			    success: suc_func
			});

}

/* 例如...
userName=周姓名
mphone=13800138000
custom.phead=
custom.phone=
custom.province=上海市
custom.city=上海
custom.area=徐汇
custom.street=某某路某某号
custom.struts=2室1厅
custom.acreage=61-90平方米
custom.age=9
custom.useage=7
problems=1霉变
problems=6污渍
problems=7除味
custFrom=手册投递
custFrom=杂志
custFrom=网络论坛
*/

/**
 * Created with JetBrains WebStorm.
 * User: Tosmon
 * Date: 13-3-25
 * Time: 下午2:35
 * To change this template use File | Settings | File Templates.
 */

function Dealer(data){
    this.id='';
    this.point={};
    this.name='';
    this.address='';
    this.map={};
    if(typeof data !=="object")
        return;
    this.id=data.dealerid;
    this.point.lat=data.latitude;
    this.point.lng=data.longitude;
    this.name=data.dealerName;
    this.address=data.dealerAddress;
	//this.dealerTel=data.dealerTel;
    this.map=data.map;
    this._setBMapMarker();
}
Dealer.prototype={
    _setBMapMarker:function(){
        var t = this;
		var myIcon = new BMap.Icon("http://wyeth.mobile1.com.cn/images/icon.png", new BMap.Size(14,24));	
        var point = new BMap.Point(t.point.lng, t.point.lat);
        var marker = new BMap.Marker(point, { icon: myIcon });
		//var marker = new BMap.Marker(point);
        var sContent =
            "<div style='width:260px'><h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+t.name+"</h4><p style='margin:0;line-height:1.5;font-size:11px;text-indent:2em;-webkit-text-size-adjust:none;'>地址："+t.address+"</p>" +
                "</div>";
        var infoWindow = new BMap.InfoWindow(sContent);
        t.map.addOverlay(marker);
        marker.addEventListener("click", function(){
            this.openInfoWindow(infoWindow);
        });
    }
}

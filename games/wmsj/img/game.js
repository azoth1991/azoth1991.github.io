// cnzz 开放计算代码
var _czc = _czc || [];
function getFullUrl() {return location.href.match(/[^#;]+/i)[0]}$(function(){var url = getFullUrl();$.ajax({type:'get',url:'http://m.xiaolebi.com/sdk/',data:{url:url},cache:false,dataType:'json',success:function(data){wx.config({appId: 'wxe47ec7fcd82a07b0',timestamp: data.timestamp,nonceStr: data.nonceStr,signature: data.signature,jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage',]});}});});
// 统计代码
function tongji() {
	// baidu
	var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F88406a9ce88af98b00c43c01033bb66d' type='text/javascript'%3E%3C/script%3E"));
// cnzz
	var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	document.write(unescape("%3Cspan id='cnzz_stat_icon_1253174262'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s5.cnzz.com/stat.php%3Fid%3D1253174262' type='text/javascript'%3E%3C/script%3E"));
}
// 广告
function guanggao() {	
	var test = new adwojs({
		 eid:'spns', //节点id
		 eid:'spnx', //节点id
		 aid: '6e27bc61c672409cb4815629d2b92596', //android安卓PID
		 pid: '992e4e24c74c4daea962c845307ba446', //iOS PID
		 bt: false,
		 af:true, //是否自动适合ipad平板广告，默认值为true。
		 width: 320, //广告图片宽度(除320外，还有720宽度，用于ipad中显示)
         height:50  //广告图片高度(除50外，还有110高度，用于ipad中显示)
	});
	test.send();
}
document.write(unescape("%3Cscript src='http://static.adwo.com/jssdk/jssdk.min.js' charset='utf-8' type='text/javascript'%3E%3C/script%3E"));
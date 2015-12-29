var userInfo = {
    'taskid':"",
    'userid':""
};
var browser = {
    versions: (function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
function saveScore(score){
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        window.location = "savescore:&message="+score;
    }else{
        JSaveScore.save(score);
    }
}
function shareScore(score){
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        window.location = "sharecore:&message="+score;
    }else{
        JShareScore.share(score);
    }
}
function getSearchObject(search){
    if(search){
        search = search.substr(1);
        search = search.split('&');
        if(Array.isArray(search) && search.length){
            var searchLen = search.length;
            var searchObj = {};
            for(var i = 0 ;i < searchLen; i++){
                var obj = search[i].split('=');
                searchObj[obj[0]] = obj[1];
            }
            userInfo.taskid = searchObj['taskid'];
            userInfo.userid = searchObj['id'];
        }
    }
}
var search = location.search;
if(search){
    getSearchObject(search);
}

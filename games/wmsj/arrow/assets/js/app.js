/*!
 * @overview: 主入口
 */
var mebtnopenurl ="http://m.xiaolebi.com/";
var gameid = "arrow";
var shareDomains = ["dm15.com", "dm15.net"];
var shareDomain = this.shareDomains[parseInt(Math.random() * this.shareDomains.length)];

window.shareData = {
    "imgUrl": "http://m.xiaolebi.com/"+ gameid +"/icon.png",
    "timeLineLink": "http://" + parseInt(Math.random()*100000) + '.' + gameid + '.' + shareDomain +'/'+ gameid +'/',
    "tTitle": "亡命射箭",
    "tContent": "我被丘比特射中了，快来跟我搞基吧"
};

(function() {
    function preloadimages(obj, cb) {
        var loaded = 0;
        var toload = 0;
        var images = obj instanceof Array ? [] : {};

        for (var i in obj) {
            toload++;
            images[i] = new Image();
            images[i].onload = load;
            images[i].onerror = load;
            images[i].onabort = load;
            images[i].src = obj[i];
        }

        function load() {
            if (++loaded >= toload) cb(images);
        }
    }

    var game = {
        $el: {
            "container": $("#game"),
            "view": $("#view"),
            "control": $("#control"),
            "index": $("#index"),
            "gameover": $("#gameover"),
            "score": $("#score")
        },

        init: function() {
            this._h = this.$el.container.height();
            this._w = this.$el.container.width();
            this._itemW = this._w / 4;
            this._vH = this._w / 4 * 10;

            this.d = 160;
            this.V = this._itemW / this.d;

            this.reset();
            this.initEvent();
            this.weixinShare();
        },

        reset: function() {
            bar.score = 0;
            this.idxList = [];
            this._isOver = false;
            this._start = false;
        },
        weixinShare: function() {
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {

                WeixinJSBridge.on('menu:share:appmessage', function(argv) {
                    WeixinJSBridge.invoke('sendAppMessage', {
                        "img_url": window.shareData.imgUrl,
                        "link": window.shareData.timeLineLink,
                        "desc": window.shareData.tContent,
                        "title": window.shareData.tTitle
                    }, function(res) {
	        	document.location.href = mebtnopenurl;
	        });
                });

                WeixinJSBridge.on('menu:share:timeline', function(argv) {
                    WeixinJSBridge.invoke('shareTimeline', {
                        "img_url": window.shareData.imgUrl,
                        "img_width": "640",
                        "img_height": "640",
                        "link": window.shareData.timeLineLink,
                        "desc": window.shareData.tContent,
                        "title": window.shareData.tTitle
                    }, function(res) {
	        	document.location.href = mebtnopenurl;
	        });
                });
            }, false);

            function onShareFriends(res) {
                _czc.push(['_trackEvent', '分享好友']);
            }

            function onShareCircle(res) {
                _czc.push(['_trackEvent', '分享朋友圈']);
            }
        },
        initEvent: function() {
            var me = this;
            var tap = ( !! ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch)) ? "touchstart" : "mousedown";
            var tapend = ( !! ('ontouchend' in window || window.DocumentTouch && document instanceof DocumentTouch)) ? "touchend" : "mouseup";

            document.body.addEventListener("touchmove", function(event) {
                event.preventDefault();
                event.stopPropagation();
            }, false);


            document.body.addEventListener("touchstart", function(event) {
                event.preventDefault();
                event.stopPropagation();
            }, false);
            // start
            $("#btn-start").on(tap, function(e) {
                e.preventDefault();
                e.stopPropagation();
                me.reset();
                me.$el.index.hide();
                me.$el.gameover.hide();
                bar.isGameStart = false;
                bar.score = 0;
                bar.radIndex = 0;
                _czc.push(['_trackEvent', '点击', '开始游戏']);
            });

            $("#btn-restart").on(tap, function(e) {
                e.preventDefault();
                e.stopPropagation();
                me.reset();
                me.$el.index.hide();
                me.$el.gameover.hide();
                bar.radIndex = 0;
                bar.isGameStart = false;
                bar.score = 0;
                bar.init();
                _czc.push(['_trackEvent', '点击', '再来一次']);
            });
            // TODO : share
            $("#btn-share").on(tap, function() {
                _czc.push(['_trackEvent', '点击', '分享游戏按钮']);
                document.getElementById("share").style.display = "block";
            });

            //记录一个状态 表示游戏已经开始了
            $("#game").on(tap, function() {
                if (bar.isShot) {
                    bar.isShot = true;
                    bar.run();
                    if (!bar.isGameStart) {
                        bar.isGameStart = true;
                    }
                }
            });
            $("#game").on(tapend, function() {
                if (bar.isShot) {
                    if (bar.isGameStart) {
                        bar.isShot = false;
                        bar.destore();
                    }
                }
            });
            bar.init();
        }
    }

    var imgList = ['assets/img/win.png', 'assets/img/fail_1.png', 'assets/img/fail_2.png', 'assets/img/fail_3.png', 'assets/img/apple.png', 'assets/img/apples.png', 'assets/img/bow.png', 'assets/img/arrow.png', 'assets/img/boyaa.png', 'assets/img/people.png', 'assets/img/logo.png', 'assets/img/retry.png', 'assets/img/shares.png', 'assets/img/start.png', 'assets/img/life.png'];
    preloadimages(imgList, function() {
        $("#by-loading").hide();
        game.init();
    });

})(window);

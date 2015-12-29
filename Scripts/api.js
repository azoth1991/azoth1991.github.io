/**
 * Created by azoth on 15/9/14.
 * api配置
 */
angular.module('api',[])
  .factory('homeService',function($resource){
    var re = [
      {
        id:1,
        title:'2015年总结',
        des:'总结一年，拥抱变化',
        author:'azoth',
        date:'2015-12-29 23：49',
        tag:['总结'],
        content:'<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年关将至公司的任务也越来越紧了，之前想完善的博客也不了了之，原定计划是用angularjs+nodejs，结果nodejs部分只在本地写了些，加上我也没有服务器可以挂后台，最后决定博客全部用json写省一部分服务器钱性能也好=。=，算是搞完了把，其他功能看是以后加还是不加，也没想把博客别人看到。</p><p><br/></p><p><span style="font-size: 20px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不是总结的总结</span></p><p><span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2015年即将过完，回想一年前的现在，我还在卷皮网做php开发，现在已经是另外一个公司的前端负责人。</span></p><p><span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首先谈谈在卷皮的日子，我很荣幸刚毕业就能在卷皮遇到我以前的项目经理yx，如果他一直在卷皮大概我也不会从这里离开，他教会了我什么是代码规范，什么是责任心，当然还有技术上的提升。他走之后在卷皮待着也没有什么特别熟的同事也没有太大自身提高，通宵加班倒是不少。现在回想起在卷皮的日子提升最大的还是责任心和态度吧。</span></p><p><span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;离开卷皮大概是6月底，后来在家里做了一个月的游戏外包，也算是调整了心态，然后去了武汉揽众，新公司有不少是卷皮的同事但之前并不认识。8月份我正式转做了前端，之前比较喜欢新技术，特别是前端方面的，所以很快适应了岗位，在职期间为公司引入了angularjs，主导了前端的技术开发，并为同事做技术培训，带起了3个angularjs零基础的同事然后升到了前端负责人。</span></p><p><span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2015年对于我能力提升最大的两次：一次是接触HTML5游戏，一次是在新公司负责前端。2015我有了第一次跳槽，第一次转行，第一次升职，第一次涨薪，收货还是挺大的，2016加油吧。</span></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>'
      },
      {
        id:2,
        title:'构建易于扩展的前端统计脚本',
        des:'博客计划更新下，阅读样式不太爽，暂时先发到这里，原文地址： http://www.soulteary.com/2015/09/21/build-scalable-analytics-script.html ',
        author:'坏蛋',
        date:'2015-09-21 18:17'
      },
      {
        id:3,
        title:'构建易于扩展的前端统计脚本',
        des:'博客计划更新下，阅读样式不太爽，暂时先发到这里，原文地址： http://www.soulteary.com/2015/09/21/build-scalable-analytics-script.html ',
        author:'坏蛋',
        date:'2015-09-21 18:17'
      },
      {
        id:4,
        title:'构建易于扩展的前端统计脚本',
        des:'博客计划更新下，阅读样式不太爽，暂时先发到这里，原文地址： http://www.soulteary.com/2015/09/21/build-scalable-analytics-script.html ',
        author:'坏蛋',
        date:'2015-09-21 18:17'
      },
      {
        id:5,
        title:'构建易于扩展的前端统计脚本',
        des:'博客计划更新下，阅读样式不太爽，暂时先发到这里，原文地址： http://www.soulteary.com/2015/09/21/build-scalable-analytics-script.html ',
        author:'坏蛋',
        date:'2015-09-21 18:17'
      },
      {
        id:6,
        title:'构建易于扩展的前端统计脚本',
        des:'博客计划更新下，阅读样式不太爽，暂时先发到这里，原文地址： http://www.soulteary.com/2015/09/21/build-scalable-analytics-script.html ',
        author:'坏蛋',
        date:'2015-09-21 18:17'
      }
    ];
    return {
      getList:function(){
        return re;
      },
      getByID:function(id){
        return re[id];
      }
    };
    //var re = $resource('',{},{
    //  get:{
    //    method:'get'
    //  }
    //});
    //var delay = $q.defer();
    //return {
    //  getByid:function(){
    //    re.get({
    //      id:1
    //    },function(data){
    //      return delay.resolve(data);
    //    },function(data){
    //      return delay.reject(data);
    //    });
    //    return delay.promise;
    //  }
    //};
  })

;
/**
 * Created by azoth on 15/9/14.
 * api配置
 */
angular.module('api',[])
  .factory('homeService',function($resource){
    var re = [
      {
        id:1,
        title:'构建易于扩展的前端统计脚本',
        des:'博客计划更新下，阅读样式不太爽，暂时先发到这里，原文地址： http://www.soulteary.com/2015/09/21/build-scalable-analytics-script.html ',
        author:'坏蛋',
        date:'2015-09-21 18:17'
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
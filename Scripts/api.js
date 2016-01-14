/**
 * Created by azoth on 15/9/14.
 * api配置
 */
angular.module('api',[])
  .factory('homeService',function($resource,$q){
    return {
      getList:function(){
        return data;
      },
      getByID:function(id){
        return data[id];
      },
      getTag:function(){
        var tagList = [{name:data[0].tag,num:1}];
        for (var i =1;i<data.length;i++){
          var isshow = 0;
          for(var j=0;j<tagList.length;j++){
            if(data[i].tag == tagList[j].name ){
              tagList[j].num++;
              isshow =1;
            }
          }
          if(isshow==0){
            tagList.push({name:data[i].tag,num:1});
          }
        }
        return tagList;
      },
      getDate:function(){
        var dateList = [{name:data[0].date,num:1}];
        for (var i =1;i<data.length;i++){
          var isshow = 0;
          for(var j=0;j<dateList.length;j++){
            if(data[i].date == dateList[j].name ){
              dateList[j].num++;
              isshow =1;
            }
          }
          if(isshow==0){
            dateList.push({name:data[i].date,num:1});
          }
        }
        return dateList;
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
/**
 * Created by azoth on 15/8/31.
 * des:过滤器，列表数据过滤
 */
angular.module('myFilter',[])
  .filter('length',function(){
    return function(input){
        if(input.length>40){
          return input.substr(0,40)+"..";
        } else {
          return input;
        }
      }
  })
  //时间过滤器,将时间戳转化为年月日
  .filter('timeToDate',function(){
    return function (input) {
      if(input==0){
        return '';
      } else {
        return new Date(parseInt(input) * 1000).toLocaleString().substr(0,20);
      }
    }
  })
  .filter('dataToTime',function(){
    return function (input) {
      var date = new Date(input.replace(/-/g,'/'));
      return date.getTime()/1000;
    }
  })
  .filter('to_trusted', ['$sce', function($sce){
    return function(text) {
      return $sce.trustAsHtml(text);
    }
  }])
;
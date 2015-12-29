/**
 * Created by azoth on 15/9/7.
 * des：公共的方法函数
 */
angular.module('common',[])
  //验证方法
  .factory('volidate',function() {
    return{
      //是否为空
      isnull:function(value) {
        if(value == undefined || value === false) {
          return false;
        }
      },
      //手机号码验证
      isphone:function(value) {
        return !!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)
      },
      //是否相同 
      issame:function(v1,v2){
        return v1===v2;
      },
      isExamine:function(input) {
        //企业的是否反馈
        switch (Number(input)) {
          case 1:
            return active;
          case 3:
            return active;
          default :
            return inactive;
        }
      }

    }
  });

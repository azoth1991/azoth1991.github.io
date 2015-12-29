/**
 * Created by azoth on 15/8/28.
 */
"use strict";
angular.module('authModule',['LocalStorageModule'])
  .factory('authService',function(localStorageService,$state){
    var name = '';
    var isAccess = false;
    return {
      //设置登录localstorage
      setitem:function(list){
        localStorageService.set('authList',JSON.stringify(list));
      },
      //获取登录localstorage
      getitem:function(){
        return JSON.parse(localStorageService.get('authList'));
      },
      //清除
      clear:function(){
        localStorageService.clearAll();
      },
      getCreateUser:function(){
        return 'admin';
      },
      getRootUrl:function(){
        return 'http://192.168.1.111:88/safety/index.php';
       //return 'http://192.168.1.102/safety/index.php';
      },
      check:function(){

      }
    }
  })
;

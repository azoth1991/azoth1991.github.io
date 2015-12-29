'use strict';
angular
  .module('app', ['ui.router','ngResource','home','api','myFilter'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("","/home");
    //home
    $stateProvider
      .state('home', {
        url:"/home",
        views:{
          "":{templateUrl:'Modules/Home/common/home.html'},
          "nav@home":{templateUrl:'Modules/Home/common/nav.html'},
          "nav-s@home":{
            templateUrl:'Modules/Home/home/nav-home.html',
            controller:'homeController'
          },
          "body@home":{
            templateUrl:'Modules/Home/home/detail.html',
            controller:'detail.homeController'
          }
        }
      });
    //about
    $stateProvider
      .state('about', {
        url:"/about",
        views:{
          "":{templateUrl:'Modules/Home/common/home.html'},
          "nav@about":{templateUrl:'Modules/Home/common/nav.html'},
          "nav-s@about":{templateUrl:'Modules/Home/about/nav-about.html'},
          "body@about":{templateUrl:'Modules/Home/about/detail.html'}
        }
      });
    //connect
    $stateProvider
      .state('connect', {
        url:"/connect",
        views:{
          "":{templateUrl:'Modules/Home/common/home.html'},
          "nav@connect":{templateUrl:'Modules/Home/common/nav.html'},
          "nav-s@connect":{templateUrl:'Modules/Home/connect/nav-connect.html'},
          "body@connect":{templateUrl:'Modules/Home/connect/detail.html'}
        }
      });
  }])
  .directive('pagerLoading', ['$rootScope', function($rootScope) {
    return {
      restrict: "C",
      link: function(scope, element) {
        $rootScope.$on('$stateChangeStart', function() {
          $(element).show();
          console.log('start');
        });

        $rootScope.$on('$stateChangeSuccess', function() {
          //$('.pagerLoading').hide();
          $(element).hide();
          console.log('end');
        });
      }
    };
  }]);
;

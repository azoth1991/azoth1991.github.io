/**
 * Created by azoth on 15/11/12.
 */
angular.module('home',[])
  .config(['$stateProvider',function($stateProvider){
    $stateProvider
      .state('home.detail', {
        url:"/detail/:id",
        views:{
          "body@home":{
            templateUrl:'Modules/Home/home/detail.html',
            controller:'detail.homeController'
          }
        }
      });
  }])
  .controller('homeController',['$scope','homeService',function($scope,homeService){
    $scope.list = homeService.getList();
  }])
  .controller('detail.homeController',['$scope','homeService','$stateParams',function($scope,homeService,$stateParams){
    $scope.detail = homeService.getByID($stateParams.id);
  }])
;
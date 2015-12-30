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
  .controller('detail.homeController',['$scope','homeService','$stateParams','$sce',function($scope,homeService,$stateParams,$sce){
    var id=0;
    if($stateParams.id!=undefined) id=$stateParams.id-1;
    $scope.detail = homeService.getByID(id);
  }])
  .controller('tag.homeController',['$scope','homeService',function($scope,homeService){
    $scope.taglist = homeService.getTag();
    $scope.timeList = homeService.getDate();
    console.log($scope.timeList);


  }])
;
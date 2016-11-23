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
            templateUrl:'Modules/Home/common/detail.html',
            controller:'detail.homeController'
          }
        }
      });

  }])
  .controller('homeController',['$scope','homeService','$state',function($scope,homeService,$state){
    $('#m-post-list').css('height', window.innerHeight)
    $scope.list = homeService.getList();
    $scope.routeRoot = $state.current.name;
    $scope.tagname = 'detail';
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

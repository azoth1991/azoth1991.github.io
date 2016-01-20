/**
 * Created by azoth on 15/11/12.
 */
angular.module('tag',[])
  .config(['$stateProvider',function($stateProvider){
    $stateProvider
      .state('tag.detail', {
        url:"/detail/:id",
        views:{
          "body@tag":{
            //templateUrl:'Modules/Home/common/detail.html',
            controller:'detail.tagController'
          }
        }
      });
  }])
  .controller('tagController',['$scope','homeService','$stateParams','$state',function($scope,homeService,$stateParams,$state){
    $scope.list = homeService.getByTag($stateParams.tag);
    $scope.routeRoot = $state.current.name;

  }])
  .controller('detail.tagController',['$scope','homeService','$stateParams',function($scope,homeService,$stateParams){
    var id=0;
    //alert();
    if($stateParams.id!=undefined) id=$stateParams.id-1;
    $scope.detail = homeService.getByID(id);
  }])
;
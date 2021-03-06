/**
 * Created by azoth on 15/11/12.
 */
angular.module('tag',[])
  .config(['$stateProvider',function($stateProvider){
    $stateProvider
      .state('tag.detail', {
        url:"/detail/:id",
        views:{
          "tag":{
            // templateUrl:'Modules/Home/common/detail.html',
            controller:'detail.tagController'
          }
        }
      });
  }])
  .controller('tagController',['$scope','homeService','$stateParams','$state',function($scope,homeService,$stateParams,$state){
    $('#m-post-list').css('height', window.innerHeight);
    $scope.list = homeService.getByTag($stateParams.tag);
    $scope.routeRoot = $state.current.name;
    $scope.tagname = $stateParams.tag;
    var id=0;
    if($stateParams.id!=undefined) id=$stateParams.id-1;
    $scope.detail = homeService.getByID(id);
    console.log('tag');

  }])
  .controller('detail.tagController',['$scope','homeService','$stateParams',function($scope,homeService,$stateParams){
    var id=0;
    if($stateParams.id!=undefined) id=$stateParams.id-1;
    $scope.detail = homeService.getByID(id);
  }])
;

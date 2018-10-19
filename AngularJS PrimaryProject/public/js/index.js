var app = angular.module('app', ['ui.router','ngMessages']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider.state("home", {
        url         : "/",
    })
    $stateProvider.state("search", {
        url         : "/search",
        templateUrl : "./modules/search/search.html"
    })
    $stateProvider.state("bookList", {
        url         : "/bookList",
        templateUrl : "./modules/list/view/list.html"
    })
    $stateProvider.state("addBook", {
        url         : "/bookAddOrEdit",
        templateUrl : "./modules/addBook/addBook.html",
        params:{
            edit:null,
            id:null
        }
    })
})

app.directive('fileModel',function ($parse) {
    return {
        restrict:"A",
        link:function (scope,element,attrs) {
            var modal=$parse(attrs.fileModel)
            var modalSetter=modal.assign;
            element.bind('change',function () {
                scope.filename=element[0].files[0].name
                scope.$apply(function () {
                    modalSetter(scope,element[0].files[0])
                })
            })
        }
    }
})

// app.directive('pageNumber',function ($parse) {
//     return {
//         restrict:"A",
//         link:function (scope,element,attrs) {
//             var modal=$parse(attrs.pageNumber)
//             var modalSetter=modal.assign;
//             element.bind('click',function () {
//                 scope.pageNumber=element[0].dataset('v');
//             })
//         }
//     }
// })



app.controller('MainController', function ($scope,$state) {
    $scope.searchs  = function () {
        $state.go("search")
    }
    $scope.bookList = function () {
        $state.go("bookList")
    }
    $scope.addBook  = function () {
        $state.go("addBook",{
            edit:false
        })
    }
    $scope.home=function(){
        $state.go("home")
    }
})



app.controller('searchController',function ($scope,$http) {
    $scope.dataList=[];
    $scope.keywords = ""
    $scope.searchFun=function(){
        $http({
            method:"GET",
            url:'/api/searchList',
            params : {
                keywords:$scope.keywords
            }
        }).success(function (data) {
            $scope.dataList=data.data.list;
        }).error(function (data) {
            console.log(data)
        })
    }
})

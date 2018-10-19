app.controller('addBookController',function ($scope,$http,$state,$stateParams) {
    $scope.filename="Choose file";
    $scope.error=false;
    console.log($state)
    console.log($stateParams)
    //null false 代表添加
    //true 代表编辑
    $scope.edit=$stateParams.edit==true?true:false;
    $scope.id=$stateParams.id
    $scope.imgurl=""
    $scope.name=""

    if($scope.edit){
        console.log($scope.id)
        $http({
            method:"GET",
            url:"http://localhost:3001/api/getId",
            params:{
                id:$scope.id
            }
        }).success(function (data) {
            $scope.filename=data.data[0].imgurl;
            $scope.imgurl=data.data[0].imgurl;
            $scope.bookName=data.data[0].name;
        }).error(function (data) {
            alert(data)
        })
        $scope.postForm=function () {
            var file = $scope.uploadFile;
            if ($scope.bookName == undefined) {
                $scope.error = true;
            } else {

                var fd  = new FormData();
                var url = "/api/postForm"
                fd.append('file', file);
                fd.append('bookname', $scope.bookName)
                fd.append('id',$scope.id);
                $http.post(url, fd, {
                    transformRequest : angular.identity,
                    headers          : { "Content-Type" : undefined }
                }).success(function (data) {
                    if (data.code) {
                        $state.go('bookList')
                    }
                }).catch(function (reason) {
                    console.log(reason)
                })
            }
        }
    }else {
        $scope.postForm=function () {
            var file = $scope.uploadFile;
            if (file == undefined || $scope.bookName == undefined) {
                $scope.error = true;
            } else {
                var fd  = new FormData();
                var url = "/api/postForm"
                fd.append('file', file);
                fd.append('bookname', $scope.bookName)
                $http.post(url, fd, {
                    transformRequest : angular.identity,
                    headers          : { "Content-Type" : undefined }
                }).success(function (data) {
                    if (data.code) {
                        $state.go('bookList')
                    }
                }).catch(function (reason) {
                    console.log(reason)
                })
            }
        }
    }
})
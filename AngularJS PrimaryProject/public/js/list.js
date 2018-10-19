app.service('listServer',function ($http) {
    this.url="";
    this.getList=function (str,obj) {
        return $http({
            method:"GET",
            url:this.url+str,
            params : obj
        })
    }
    this.postDelete=function (str,obj) {
        return $http({
            method:"POST",
            url:this.url+str,
            data : obj
        })
    }
})
app.controller('listController',function ($scope,$state,$http,listServer) {
    $scope.dataList=[];
    $scope.pageList=[];
    $scope.pageNumber=0;
    $scope.clickNumber=function(i){
        var obj={
            pageSize:10,
            pageNumber:Number(i)
        };
        listServer.getList('/api/getList',obj).success(function (data) {
            $scope.dataList=data.data.list;
            $scope.pageList=data.data.pageList;
            $scope.pageNumber=data.data.pageNumber;
        }).error(function (data) {
            alert(data)
        })
    }
    var obj={
        pageSize:10,
        pageNumber:1
    };
    listServer.getList('/api/getList',obj).success(function (data) {
        $scope.dataList=data.data.list;
        $scope.pageList=data.data.pageList;
        $scope.pageNumber=data.data.pageNumber;
    }).error(function (data) {
        alert(data)
    })
    $scope.deleteBook=function (id) {
        console.log(id)
        var bol=confirm("是否删除书籍？")
        if(bol==true){
            listServer.postDelete('/api/postDelete',{
                id:id
            }).success(function (data) {
                console.log(data)
                if(data.code){
                    alert("删除成功")
                    var obj={
                        pageSize:10,
                        pageNumber:1
                    };
                    listServer.getList('/api/getList',obj).success(function (data) {
                        $scope.dataList=data.data.list;
                        $scope.pageList=data.data.pageList;
                        $scope.pageNumber=data.data.pageNumber;
                    }).error(function (data) {
                        alert(data)
                    })
                }
            }).error(function (data) {
                alert(data);
            })
        }
    }
//    编辑
    $scope.editInfo=function (id) {
        $state.go("addBook",{
            edit:true,
            id:id
        })
    }
})
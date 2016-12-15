var app = angular.module("weatherApp",['ngRoute','ngResource']);

var resultLinkHref = '#';


// Routes

app.config(function ($routeProvider){

    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainCtr'

        })

        .when('/fcast',{
            templateUrl: 'pages/forecast.html',
            controller: 'foreC'

        })

            .when('/:days', {
                templateUrl: 'pages/home.html',
                controller: 'mainCtr'

            })


});

// Controllers

app.controller("mainCtr", ['$scope', '$http', '$routeParams', 'nameService', function ($scope, $http, $routeParams, nameService) {

    $scope.weatherResult = [];
    var paramData = {cnt:$scope.days };
    $scope.cName = nameService.cName;
    $scope.days = $routeParams.days;
    $scope.getwWeatherAPI = function () {
        $http({ method: 'GET', url: "http://api.openweathermap.org/data/2.5/forecast/daily?APPID=b1c4146ea71e502e68bb1ff5c34ba5fa&units=metric" , 
            params: {
                q: $scope.cName,
                cnt: $scope.days
            }
        
})
    .success(function (data, status) {
        $scope.weatherResult = data;
    });
    }

    $scope.$watch('cName', function(){
        nameService.cName = $scope.cName;

   });

    $scope.convertToDate = function (dt) {
        return new Date(dt * 1000);
    }

}]);

app.controller("foreC", ['$scope', '$http', '$resource', 'nameService', function ($scope, $http, $resource, nameService) {

    $scope.cName = nameService.cName;

    

    $scope.$watch('cName', function () {
        nameService.cName = $scope.cName;

    });


}]);

// Custom Services

app.service('nameService', function () {

    var self = this;
    this.cName = 'Budapest';

});


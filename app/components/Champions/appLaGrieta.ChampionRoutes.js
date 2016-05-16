/**
 * Created by Juan Pa on 29/03/2016.
 */
angular.module("appLaGrieta",['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/champions',{
                templateUrl: 'champions.html',
                controller: 'ChampionsCtrl as cc'
            })
            .when('/champion-detail/:name',{
                templateUrl: 'champion-detail.html',
                controller: 'ChampionsCtrl as cc'
            })
            .otherwise({
                redirectTo: '/champions'
            });
    }]);
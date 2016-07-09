/**
 * Created by Juan Pa on 08/06/2016.
 */
angular.module("appLaGrieta",['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/match-history',{
                templateUrl: 'match-history.html',
                controller: 'matchCtrl as cc'
            })
            .otherwise({
                redirectTo: '/match-history'
            });
    }]);
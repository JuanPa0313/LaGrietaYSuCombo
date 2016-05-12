/**
 * Created by jprod01 on 11/03/2016.
 */
angular.module("appLaGrieta")
    .config(function($routeProvider){
        $routeProvider
            .when('Champions/home',{
                templateUrl: '../Champions/home.html',
                controller: 'homeCtrl as hc'
            })
            .when('Champions/champions',{
                templateUrl: '../Champions/champions.html',

            })
            .otherwise({
                redirectTo: '/home'
            });
    });
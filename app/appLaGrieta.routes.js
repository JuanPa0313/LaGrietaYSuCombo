/**
 * Created by jprod01 on 11/03/2016.
 */
angular.module("appLaGrieta",['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('Champions/home',{
                templateUrl: '../Champions/home.html',
                controller: 'homeCtrl as hc'
            })
            .when('Champions/champions',{
                templateUrl: '../Champions/champions.html',

            })
            .when('MatchHistory/home',{
                templateUrl: '../MatchHistory/match-history.html',

            })
            .when('MatchHistory/match-history',{
                templateUrl: '../MatchHistory/match-history.html',

            })
            .otherwise({
                redirectTo: '/home'
            });
    });
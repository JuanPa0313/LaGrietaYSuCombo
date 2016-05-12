/**
 * Created by jprod01 on 11/03/2016.
 */
angular.module("appLaGrieta")
    .controller("homeCtrl",homeController);


function homeController(homeFactory){
    var ctrl = this;
    ctrl.champions = [];

    homeFactory.get().success(function(data) {
        var parsed = data.data;
        for(var champ in parsed){
            ctrl.champions.push(parsed[champ]);
        }
    });



   // function champions(http){
   //     console.log("Entra a buscar api");
   //    http.get('http://localhost:3030/api/getHello').success(function(data) {
   //        return data.message;
   //    })
   //}

    //$http.get('http://localhost:3030/api/getHello').success(function(data) {
    //    ctrl.message=data.message;
    //})

}
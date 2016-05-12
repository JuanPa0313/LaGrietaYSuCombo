/**
 * Created by Juan Pa on 29/03/2016.
 */

angular.module("appLaGrieta")
    .controller("ChampionsCtrl",championsController);

function championsController($location, championsFactory ){
    var ctrl = this;
    ctrl.champions = [];

    championsFactory.get().success(function(data) {
        var parsed = data.data;
        for(var champ in parsed){
            ctrl.champions.push(parsed[champ]);
        }
    });

    ctrl.numberChamps = ctrl.champions.length;

    ctrl.detailChampData = {};
    ctrl.getChampionDetails = function (id) {

        championsFactory.getChampDetails(id)
            // if successful creation, call our get function to get all the new todos
            .success(function (data) {
                var parsed = data;
                ctrl.detailChampData=parsed;
                alert(parsed.info.difficulty);
                localStorage.setItem('champDetail',JSON.stringify(parsed));
                $location.path('/champion-detail/'+ctrl.detailChampData.name);
            });
    };

    ctrl.loadChampionDetails = function(){
      ctrl.detailChampData = JSON.parse(localStorage.getItem('champDetail'));
    };

    ctrl.loadChampionDetails();

}




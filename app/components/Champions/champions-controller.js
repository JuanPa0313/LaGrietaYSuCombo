/**
 * Created by Juan Pa on 29/03/2016.
 */

angular.module("appLaGrieta")
    .controller("ChampionsCtrl",championsController);

function championsController($timeout, $location, championsFactory ){
    var vm = this;
    //todo Obtencion de Campeones del servidor
    vm.champions = [];

    championsFactory.get().success(function(data) {
        var parsed = data.data;
        for(var champ in parsed){
            vm.champions.push(parsed[champ]);
        }
    });

    //todo end
    vm.numberChamps = vm.champions.length;


    //todo Obtencion de la informacion de campeones por id
    vm.detailChampData = {};
    vm.getChampionDetails = function (id) {

        championsFactory.getChampDetails(id)
            // if successful creation, call our get function to get all the new todos
            .success(function (data) {
                var parsed = data;
                vm.detailChampData=parsed;
                alert(parsed.info.difficulty);
                localStorage.setItem('champDetail',JSON.stringify(parsed));
                $location.path('/champion-detail/'+vm.detailChampData.name);
            });
    };

    vm.loadChampionDetails = function(){
      vm.detailChampData = JSON.parse(localStorage.getItem('champDetail'));
    };

    vm.loadChampionDetails();
    //todo end
}




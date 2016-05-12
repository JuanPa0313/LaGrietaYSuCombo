/**
 * Created by Juan Pa on 30/03/2016.
 */
angular.module("appLaGrieta")
    .controller("ChampionDetailCtrl",championDetailController);


function championDetailController(championsFactory) {
    var ctrl = this;
    ctrl.detailChampData = [];

    ctrl.getChampionDetails = function (id) {
        championsFactory.getChampDetails(id)
            // if successful creation, call our get function to get all the new todos
            .success(function (data) {
                var parsed = data.data;
                for (var detail in parsed) {
                    ctrl.detailChampData.push(parsed[detail]);
                }
            });
    };
}
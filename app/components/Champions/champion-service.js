/**
 * Created by Juan Pa on 5/19/2016.
 */
angular.module("appLaGrieta")
    .factory('championService',championService);

function championService(){
    var detailChampData = {};

    this.storeData = function (data){
        detailChampData=data;
    }

    return detailChampData;
}
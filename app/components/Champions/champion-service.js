/**
 * Created by Juan Pa on 5/19/2016.
 */
angular.module("appLaGrieta")
    .factory('championService',championService);

function championService(){
    var Service ={
        isGoogleLoaded: false,
        getGoogleLoaded:function(){
            return this.isGoogleLoaded;
        },
        setGoogleLoaded:function(googleLoad){
            this.isGoogleLoaded=googleLoad;
        },
        nameIndex:0,
        setNameIndex:function(num){
            this.nameIndex=num;
        }
    }

    return Service;

}
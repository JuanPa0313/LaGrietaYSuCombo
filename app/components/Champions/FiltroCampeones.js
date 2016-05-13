/**
 * Created by Juan Pa on 13/05/2016.
 */
angular.module("appLaGrieta")
    .filter("FiltroCampeones", filtroCampeones());

function filtroCampeones(){
    return function(arrayLength){
        arrayLength = Math.ceil(arrayLength);
        var arr = new Array(arrayLength);
        for (var i = 0; i<arrayLength;i++){
            arr[i]=i;
        }
        return arr;
    }
}
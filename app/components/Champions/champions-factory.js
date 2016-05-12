/**
 * Created by Juan Pa on 29/03/2016.
 */
angular.module("appLaGrieta")
    .factory('championsFactory',championsFactory);



function championsFactory($http){
    return {
        get : function() {
            return $http.get('http://localhost:3030/api/getChampImages');
        },
        getChampDetails: function (id){
            return $http.get('http://localhost:3030/api/getDetailsChamp/'+id);
        },

        /*create : function(todoData) {
         return $http.post('/api/todos', todoData);
         },
         delete : function(id) {
         return $http.delete('/api/todos/' + id);
         }*/
    }
}

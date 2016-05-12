/**
 * Created by jprod01 on 11/03/2016.
 */
angular.module("appLaGrieta")
    .factory('homeFactory',homeFactory);



function homeFactory($http){
    return {
        get : function() {
            return $http.get('http://localhost:3030/api/getChampImages');
        },
        /*create : function(todoData) {
            return $http.post('/api/todos', todoData);
        },
        delete : function(id) {
            return $http.delete('/api/todos/' + id);
        }*/
    }
}

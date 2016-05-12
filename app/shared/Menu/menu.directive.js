/**
 * Created by Juan Pa on 28/03/2016.
 */
angular.module("appLaGrieta")
    .directive("menuGrieta",laGrietaMenu);

function laGrietaMenu(){
    return {
        restrict:'EA',
        templateUrl:'/LaGrieta/app/shared/Menu/nav-menu.html'
    };
}
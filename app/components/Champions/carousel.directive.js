/**
 * Created by Juan Pa on 17/05/2016.
 */
angular.module("appLaGrieta")
    .directive("slider", slickSlider);

function slickSlider($timeout){
    return {
        restrict :'EA',
        link: function(scope, element, attrs){
            $timeout(function(){
                $(element).slick(scope.$eval(attrs.slider));
            });
        }
    }
}
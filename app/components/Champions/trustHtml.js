/**
 * Created by Juan Pa on 16/05/2016.
 */

angular.module('appLaGrietaFilters')
    .filter('trustHtml', trustHtml($sce));

function trustHtml($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
};
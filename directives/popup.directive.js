(function () {
    angular
        .module('app')
        .directive('popup', popup);
    
    function popup () {

        return {
            restrict: "E",
            templateUrl: frontCfg.templates_url_html + 'popup.html',
            controller: "PopupController",
            controllerAs: "popup"
        }
    }
})();
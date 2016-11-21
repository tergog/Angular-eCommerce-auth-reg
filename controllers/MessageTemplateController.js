(function () {

    angular.module('app')
        .controller('MessageTemplateController', MessageTemplateController);

    MessageTemplateController.$inject = ['$scope', 'popup', '$timeout', '$document'];

    function MessageTemplateController ($scope,popup, $timeout, $document) {

        var vm = this;
        vm.popupMessage = popup.message;
        popup.title = frontCfg.translations.message;
        
        vm.popupTimer = $timeout(function () {
            popup.close();
            document.location.reload();
        }, 3000);
        
        $scope.$on("$destroy", function() {
            $timeout.cancel(vm.popupTimer);
        })
    }
} )();
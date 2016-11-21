(function () {

    angular.module('app')
        .controller('ConfirmPassTemplateController', ConfirmPassTemplateController);

    ConfirmPassTemplateController.$inject = ['dataService', 'popup', 'UserAuthService'];

    function ConfirmPassTemplateController (dataService, popup, UserAuthService) {

        var vm = this;
        vm.formData = {};
        vm.sendPass = sendPass;
        popup.title = frontCfg.translations.passCreate;

        function sendPass() {
            
            vm.formData.userId = UserAuthService.userId;
            vm.formData.confirmCode = UserAuthService.confirmCode;
            dataService.sendPass(vm.formData).success(successCallback).error(errorCallback);

            function successCallback() {
                popup.navigate('login');
            }
        }

        function errorCallback (obj) {
            vm.formErrors = dataService.errorCallback(obj.errors);
        }
    }
} )();
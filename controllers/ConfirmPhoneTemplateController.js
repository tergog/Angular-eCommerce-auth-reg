(function () {

    angular.module('app')
           .controller('ConfirmPhoneTemplateController', ConfirmPhoneTemplateController);

    ConfirmPhoneTemplateController.$inject = ['dataService', 'popup', 'UserAuthService'];

    function ConfirmPhoneTemplateController (dataService, popup, UserAuthService) {

        var vm = this;
        vm.formData = {};
        vm.sendPhone = sendPhone;
        popup.title = frontCfg.translations.passRecovery;

        function sendPhone() {

            dataService.sendPhone(vm.formData).success(successCallback).error(errorCallback);

            function successCallback(obj) {
                UserAuthService.userId = obj.data.userId;
                UserAuthService.authKey = obj.data.authKey;
                UserAuthService.fullName = obj.data.fullName;
                UserAuthService.phone = obj.data.phone;
                popup.navigate('resetConfirm');
            }
        }

        function errorCallback (obj) {
            vm.formErrors = dataService.errorCallback(obj.errors);
        }
    }
} )();
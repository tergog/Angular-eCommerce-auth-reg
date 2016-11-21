(function () {

    angular.module('app')
        .controller('ResetConfirmTemplateController', ResetConfirmTemplateController);

    ResetConfirmTemplateController.$inject = ['dataService', 'popup', 'UserAuthService'];

    function ResetConfirmTemplateController (dataService, popup, UserAuthService) {

        var vm = this;
        vm.formData = {};
        vm.fullName = UserAuthService.fullName;
        vm.phone = UserAuthService.phone;
        vm.keyConfirm = keyConfirm;
        vm.resendConfirm = resendConfirm;
        popup.title = frontCfg.translations.passRecovery;

        function keyConfirm() {
            vm.formData.userId = UserAuthService.userId;
            vm.formData.authKey = UserAuthService.authKey;
            dataService.keyConfirm(vm.formData).success(successCallback).error(errorCallback);

            function successCallback (obj) {
                UserAuthService.passwordResetToken = obj.data.passwordResetToken;
                popup.navigate('reset');
            }

        }

        function resendConfirm() {
            vm.formErrors = {};
            dataService.resendConfirm(UserAuthService).error(errorCallback);
        }

        function errorCallback (obj) {
            vm.formErrors = dataService.errorCallback(obj.errors);
        }
    }
} )();
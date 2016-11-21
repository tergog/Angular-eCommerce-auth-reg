(function () {

    angular.module('app')
        .controller('ResetTemplateController', ResetTemplateController);

    ResetTemplateController.$inject = ['dataService', 'popup', 'UserAuthService'];

    function ResetTemplateController (dataService, popup, UserAuthService) {

        var vm = this;
        vm.formData = {};
        vm.resetPassword = resetPassword;
        popup.title = frontCfg.translations.passRecovery;


        function resetPassword() {

            vm.formData.userId = UserAuthService.userId;
            vm.formData.passwordResetToken = UserAuthService.passwordResetToken;
            dataService.resetPassword(vm.formData).success(successCallback).error(errorCallback);
            
            function successCallback(obj) {
                popup.message = frontCfg.translations.successPassRecovery;
                popup.navigate('login');
            }
        }

        function errorCallback(obj) {
            vm.formErrors = dataService.errorCallback(obj.errors);
        }
    }
} )();
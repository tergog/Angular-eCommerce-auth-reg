(function () {

    angular.module('app')
        .controller('ConfirmTemplateController', ConfirmTemplateController);

    ConfirmTemplateController.$inject = ['dataService', 'popup', 'UserAuthService', 'ipCookie'];

    function ConfirmTemplateController (dataService, popup, UserAuthService, ipCookie) {

        var vm = this;
        vm.formData = {};
        vm.data = UserAuthService.data;
        vm.changeData = changeData;
        vm.signupConfirm = signupConfirm;
        vm.resendConfirm = resendConfirm;
        popup.title = frontCfg.translations.signupConfirm;

        function changeData () {
                popup.navigate('signup');
        }

        function signupConfirm () {

            vm.formData.userId = UserAuthService.userId;
            vm.formData.authKey = UserAuthService.authKey;
            dataService.signupConfirm(vm.formData).success(successCallback).error(errorCallback);

            function successCallback(obj) {
                UserAuthService.isLogged = true;
                ipCookie(frontCfg.identityName, obj.data.identityValue, {domain: frontCfg.identityDomain, path: '/'});
                ipCookie(frontCfg.authName, UserAuthService.authKey, {domain: frontCfg.identityDomain, path: '/'});
                popup.message = frontCfg.translations.signupSuccess;
                popup.navigate('message');
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
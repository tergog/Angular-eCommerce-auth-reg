(function () {

    angular.module('app')
        .controller('LoginTemplateController', LoginTemplateController);

    LoginTemplateController.$inject = ['dataService', 'popup', 'UserAuthService', 'ipCookie'];

    function LoginTemplateController (dataService, popup, UserAuthService, ipCookie) {

        var vm = this;
        vm.formData = {};
        vm.userLogin = userLogin;
        popup.title = frontCfg.translations.authTitle;

        function userLogin() {

            dataService.userLogin(vm.formData).success(successCallback).error(errorCallback);

            function successCallback(obj) {
                UserAuthService.userId = obj.data.userId;
                UserAuthService.isLogged = true;
                ipCookie(frontCfg.identityName, obj.data.identityValue, {domain: frontCfg.identityDomain, path: '/'});
                ipCookie(frontCfg.keyName, obj.data.authKey, {domain: frontCfg.identityDomain, path: '/'});
                popup.message = frontCfg.translations.loginSuccess;
                popup.navigate('message');
            }
        }

        function errorCallback (obj) {
            vm.formErrors = dataService.errorCallback(obj.errors);
        }
    }
} )();
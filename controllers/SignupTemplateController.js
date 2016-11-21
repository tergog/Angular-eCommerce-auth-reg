(function () {

    angular.module('app')
           .controller('SignupTemplateController', SignupTemplateController);

    SignupTemplateController.$inject = ['dataService', 'popup', 'UserAuthService'];

    function SignupTemplateController (dataService, popup, UserAuthService) {

        var vm = this;
        vm.formData = UserAuthService.data || {};
        vm.formData.role = vm.formData.role || "patient";
        vm.validate = validate;
        vm.userSignup = userSignup;
        vm.userUpdate = userUpdate;
        popup.title = frontCfg.translations.signupTitle;

        function validate (form) {

            if (form.$error.required) {
                form.$error.required.forEach(function (el) {
                    el.$setTouched();
                })
            }

            if (form.$valid) {
                UserAuthService.isRegistering ? userUpdate() : userSignup();
            }
        }

        function userSignup() {

            dataService.userSignup(vm.formData).success(successCallback).error(errorCallback);

            function successCallback(obj) {
                UserAuthService.userId = obj.data.userId;
                UserAuthService.authKey = obj.data.authKey;
                UserAuthService.data = vm.formData;
                UserAuthService.isRegistering = true;
                popup.navigate('confirm');
            }
        }

        function userUpdate () {
            
            vm.formErrors = {};
            vm.formData.userId = UserAuthService.userId;
            vm.formData.authKey = UserAuthService.authKey;
            dataService.userUpdate(vm.formData).success(successCallback).error(errorCallback);

            function successCallback(obj) {
                UserAuthService.data = vm.formData;
                popup.navigate('confirm');
            }
        }

        function errorCallback (obj) {
            vm.formErrors = dataService.errorCallback(obj.errors);
        }
    }
} )();
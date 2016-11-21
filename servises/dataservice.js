(function () {

    angular
        .module("app")
        .factory('dataService', dataService);

    dataService.$inject = ['$http', 'popup'];

    function dataService ($http, popup) {

        return {
            userSignup: userSignup,
            signupConfirm: signupConfirm,
            resendConfirm: resendConfirm,
            userLogin: userLogin,
            userLogout: userLogout,
            keyConfirm: keyConfirm,
            sendPhone: sendPhone,
            sendPass: sendPass,
            resetPassword: resetPassword,
        };

        function userSignup (data) {
            return $http.post(frontCfg.userSignupUrl, data);
        }

        function signupConfirm (data) {
            return $http.post(frontCfg.signupConfirmUrl, data);
        }

        function resendConfirm (data) {
            return $http.post(frontCfg.resendConfirmUrl, data);
        }

        function userLogin (data) {
            return $http.post(frontCfg.userLoginUrl, data);
        }

        function userLogout () {
            $http.get(frontCfg.userLogoutUrl);
        }

        function userUpdate (data) {
            return $http.post(frontCfg.userUpdateUrl, data);
        }

        function keyConfirm (data) {
            return $http.post(frontCfg.keyConfirmUrl, data);
        }

        function sendPhone (data) {
            return $http.post(frontCfg.sendPhoneUrl, data);
        }

        function sendPass (data) {
            return $http.post(frontCfg.sendPassUrl, data);
        }

        function resetPassword (data) {
            return $http.post(frontCfg.resetPasswordUrl, data);
        }
    }
    
})();
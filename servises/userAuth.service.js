(function () {

    angular
        .module("app")
        .factory('UserAuthService', UserAuthService);

    UserAuthService.$inject = ['ipCookie'];

    function UserAuthService(ipCookie) {
        
        return {
            isLogged: typeof ipCookie(frontCfg.identityName) !== 'undefined'
        }
    }
})();
(function () {

    angular.module('app')
        .controller('BodyTestController', BodyTestController);

    BodyTestController.$inject = ['$scope', 'dataService', 'popup', 'UserAuthService', 'ipCookie', '$window', '$location', '$http'];

    function BodyTestController ($scope, dataService, popup, UserAuthService, ipCookie, $window, $location, $http) {

        var vm = this;

        vm.popup = popup.isActive;
        vm.isLogged = UserAuthService.isLogged;
        vm.togglePopup = togglePopup;
        vm.userLogout = userLogout;

        $scope.$watch(function () {return popup.isActive}, function (newValue) {vm.popup = newValue});
        $scope.$watch(function () {return UserAuthService.isLogged}, function (newValue) {vm.isLogged = newValue});

        function userLogout () {
            ipCookie.remove(frontCfg.identityName, {domain: frontCfg.identityDomain, path: '/'});
            ipCookie.remove(frontCfg.sessionName, {domain: frontCfg.sessionDomain, path: '/'});
            UserAuthService.isLogged = false;
            dataService.userLogout();
            $window.location.href = '/';
        }

        function togglePopup (path) {
            $scope.fadeIn = true;
            vm.popup = popup.isActive = !popup.isActive;
            popup.navigate(path)
        }
    }
} )();
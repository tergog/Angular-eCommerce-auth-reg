angular.module('app', ['ipCookie']).constant('frontCfg', frontCfg)
    .config(['$httpProvider' , function ($httpProvider) {

        $httpProvider.defaults.headers.common = {
            Authorization: 'Basic 85491f213167ad66b8969c53f389b29b'
        };
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {
            'Content-Type': 'application/json;charset=utf-8'
        };
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);

var frontCfg = {};
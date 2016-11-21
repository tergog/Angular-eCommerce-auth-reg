(function () {

    angular
        .module("app")
        .factory('popup', popup);
    
    popup.$inject = ['UserAuthService'];
    
    function popup (UserAuthService) {

        return {
            isActive: false,
            title: 'Popup',
            navigate: navigate,
            close: close
        };
        
        function navigate (path) {

            return this.currentTemplate = frontCfg.popup_templates[path];
        }
        
        function close () {

            UserAuthService.isRegistering = false;
            delete UserAuthService.data;
            return this.isActive = !this.isActive;
        }
    }
            
})();
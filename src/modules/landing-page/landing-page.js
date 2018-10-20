(function() {
    "use strict";

    angular
        .module("GoReplayModule")
        .component("landingPage", {

            restrict: "E",
            templateUrl: "/modules/landing-page/landing-page.html",
            bindings: {},
            controller: landingPageController,
            controllerAs: "vm"
        });

    /*@ngInject*/
    function landingPageController($rootScope, utils, $uibModal) {

        var vm = this;

        $rootScope.notifications = [];
        vm.configuration = {};
        vm.configuration.enableTrafficControl = false;

        vm.showStartModal = showStartModal;
        vm.showStopModal = showStopModal;

        function showStartModal() {
            var wizardDoneListener,
                modalInstance,
                closeWizard;

            modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: "/modules/start-modal/start-modal.html",
                controller: "startModalController",
                controllerAs: "vm",
                size: "md",
                resolve: {
                    configuration: function() {
                        return vm.configuration;
                    }
                }
            });

            closeWizard = function(e, reason) {
                modalInstance.dismiss(reason);
                wizardDoneListener();
            };

            modalInstance.result.then(function() {}, function() {});
            wizardDoneListener = $rootScope.$on("modal.done", closeWizard);
        }

        function showStopModal() {
            var wizardDoneListener,
                modalInstance,
                closeWizard;

            modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: "/modules/stop-modal/stop-modal.html",
                controller: "stopModalController",
                controllerAs: "vm",
                size: "md"
            });

            closeWizard = function(e, reason) {
                modalInstance.dismiss(reason);
                wizardDoneListener();
            };

            modalInstance.result.then(function() {}, function() {});
            wizardDoneListener = $rootScope.$on("modal.done", closeWizard);
        }

    }

})();
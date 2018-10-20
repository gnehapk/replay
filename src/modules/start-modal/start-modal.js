(function() {
    "use strict";

    angular
        .module("GoReplayModule")
        .controller("startModalController", startModalController);

    /*@ngInject*/
    function startModalController($rootScope, configuration, utils) {

        var vm = this;

        vm.cancelModal = cancelModal;
        vm.startGoReplay = startGoReplay;

        function cancelModal() {
            $rootScope.$emit("modal.done", "cancel");
        }

        function startGoReplay() {

            vm.cancelModal();

            utils.startGoReplay(configuration)
                .then(function() {
                    $rootScope.notifications.push({type: "success", msg: "GoReplay started successfully."});
                }).catch(function(e) {
                    $rootScope.notifications.push({type: "danger", msg: "Failed to start GoReplay."});
                });
        }

    }

})();
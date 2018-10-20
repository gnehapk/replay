(function() {
    "use strict";

    angular
        .module("GoReplayModule")
        .controller("stopModalController", stopModalController);

    /*@ngInject*/
    function stopModalController($rootScope, utils) {

        var vm = this;

        vm.cancelModal = cancelModal;
        vm.stopGoReplay = stopGoReplay;

        function cancelModal() {
            $rootScope.$emit("modal.done", "cancel");
        }

        function stopGoReplay() {

            vm.cancelModal();

            utils.stopGoReplay()
                .then(function() {
                    $rootScope.notifications.push({type: "success", msg: "GoReplay stopped successfully."});
                }).catch(function(e) {
                    $rootScope.notifications.push({type: "danger", msg: "Failed to stop GoReplay."});
                });
        }

    }

})();
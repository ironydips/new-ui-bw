(function(angular) {
    'use strict';

    function TimeslotModalController($state, moment, TimeslotService) {
        var ctrl = this;
        ctrl.timeslot = (ctrl.resolve && ctrl.resolve.details) || { days: {}, timeslots: {}, availables: {}, isDisabled : false };

        ctrl.save = function() {
            ctrl.loader = true;
            var today = moment(ctrl.timeslot.endDate);
            ctrl.timeslot.until = moment(today).add(1, 'days').format("MM.DD.YYYY");
            debugger;
            TimeslotService.createTimeSlotsRange(ctrl.timeslot)
                .then(function(result) {
                    ctrl.loader = false;
                    ctrl.modalInstance.close({ action: "update" });
                })
                .catch(function(err) {
                    console.log('Error Timeslot detail');
                    console.log(err);
                });

        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
    }

    angular.module('timeslotModal')
        .component('timeslotModal', {
            templateUrl: 'admin/timeslot/timeslot-modal/timeslot-modal.template.html',
            controller: ['$state', 'moment', 'TimeslotService', TimeslotModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular)
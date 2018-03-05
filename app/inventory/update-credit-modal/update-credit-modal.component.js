(function(angular) {
'use strict';

function updateCreditModalController($state,inventoryService) {
	var ctrl = this;
	ctrl.item = (ctrl.resolve && ctrl.resolve.details) || {};

	ctrl.save = function(credit){
		ctrl.loader = true;
		inventoryService.updateInventory(ctrl.item.storedItemId, credit, "STORED")
					.then(function(response){
						ctrl.loader = false;
						ctrl.modalInstance.close({action: 'update'});
					})
					.catch(function(err){
						console.log('Error getting user-items details:');
						console.log(err);
					});	
	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
		};

	}

angular.module('updateCreditModal')
	.component('updateCreditModal',{
		templateUrl: 'inventory/update-credit-modal/update-credit-modal.template.html',
		controller:['$state','inventoryService', updateCreditModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);
(function(angular) {
'use strict';


function openPopUpCompleted(details){
	var modalInstance = this.$uibModal.open({
			component: 'userRequestCompleteModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			resolve:{
				details: function(){
					return (details || {});
				}
			},
			backdrop: 'static'
		});

		modalInstance.result.then(angular.bind(this, function(data){
			//data passed when pop up closed.
			if(data == "update") this.$state.reload();
			
		}), angular.bind(this, function(err){
			console.log('Error in add-driver Modal');
			console.log(err);
		})
		)
};
function openPopUpnotstarted(details){
	var modalInstance = this.$uibModal.open({
			component: 'userRequestNotStartedModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			resolve:{
				details: function(){
					return (details || {});
				}
			},
			backdrop: 'static'
		});

		modalInstance.result.then(angular.bind(this, function(data){
			//data passed when pop up closed.
			if(data == "update") this.$state.reload();
			
		}), angular.bind(this, function(err){
			console.log('Error in add-driver Modal');
			console.log(err);
		})
		)
};
function openPopUpinProgress(details){
		var modalInstance = this.$uibModal.open({
			component: 'userRequestInProgressModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			resolve:{
				details: function(){
					return (details || {});
				}
			},
			backdrop: 'static'
		});

		modalInstance.result.then(angular.bind(this, function(data){
			//data passed when pop up closed.
			if(data == "update") this.$state.reload();
			
		}), angular.bind(this, function(err){
			console.log('Error in add-driver Modal');
			console.log(err);
		})
		)
};

function UserRequestController($rootScope, $state, $http, $uibModal) {
	var ctrl = this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;

	ctrl.complete = function(){
		angular.bind(ctrl, openPopUpCompleted, null)();
	};
	ctrl.notstarted = function(){
		angular.bind(ctrl, openPopUpnotstarted, null)();
	};
	ctrl.inprogress = function(){
		angular.bind(ctrl, openPopUpinProgress, null)();
	};
	}

angular.module('userRequest')
	.component('userRequest',{
		templateUrl: 'pickup-delivery-management/user-request/user-request-details/user-request.template.html',
		controller:['$rootScope','$state','$http', '$uibModal', UserRequestController]
	});
})(window.angular);
(function(angular) {
'use strict';

//transformed data for display
function transformData(driver){
	driver.streetAddress = driver.address.streetAddress;
	driver.apartment = driver.address.apartment;
	driver.city = driver.address.city;
	driver.state = driver.address.state;
	driver.zipCode = driver.address.zipCode;
	driver.emergencyPhoneNumber = driver.emergencyContactNumber;
	driver.licenseId = driver.licenseID
	return driver;
}

function openPopUp(details){
	
	var modalInstance = this.$uibModal.open({
			component: 'driverModal',
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
}

function DriverDetailsController($rootScope, $state, $uibModal, DriverService) {
	var ctrl = this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;

	ctrl.init = function(){
		//get driver details.
		DriverService.getAllDrivers()
				.then(function(driverDetails){
					ctrl.drivers = driverDetails.data;
				})
				.catch(function(err){
					console.log('Error getting driver details:');
					console.log(err);
				})
	};

	ctrl.addDriver = function(){
		angular.bind(ctrl, openPopUp, null)();
	};

	ctrl.showDetails = function(driverDetails){
		angular.bind(ctrl, openPopUp, transformData(driverDetails))();
	}

	ctrl.init();
}

angular.module('driverDetails')
	.component('driverDetails',{
		templateUrl: 'admin/driver/driver-details/driver-details.template.html',
		controller:['$rootScope','$state', '$uibModal','DriverService', DriverDetailsController]
	});
})(window.angular);
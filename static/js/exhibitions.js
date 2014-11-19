//What is the intent of the exhibitions and touring strategy
function IntentVM() {
    var self = this;
    self.socioeconomic = ko.observable('');
    self.impact = ko.observable('');
    self.artistic = ko.observable('');
    self.isComplete = ko.computed(function () {
        if ((self.socioeconomic().length > 3) && (self.impact().length > 3) && (self.artistic().length > 3)) {
            return true;
        } else {
            return false;
        }
    });
}

// What is the exhibition the customers are interested and what are the constraints (=priorities) and actions.
// Each exhibition has constraints (=priorities) and actions associated with it.
function Exhibition() {
  var self = this;
  self.venue = ko.observable('');
  self.description = ko.observable('');

  //Priorities
  self.constraintOperational = ko.observable('');
  self.constraintFinancial = ko.observable('');
  self.constraintPolitical = ko.observable('');

  //Actions
  self.actionVision = ko.observable('');
  self.actionFirstSteps = ko.observable('');
  self.actionDiscomfort = ko.observable('');
}

// Each customer group has a description and a list of exhibitions to server it.
var CustomerGroup = function () {
    var self = this;
    self.description = ko.observable('');
    self.exhibitions = ko.observableArray([]);
    
    self.AddExhibition = function () {
    	var exhibition = new Exhibition().venue('').description('');
    	self.exhibitions.push(exhibition);
    	//console.log('Added Exhibition')
    }
    
    self.RemoveExhibition = function (record) {
        //console.log('Removing Exhibition');
        self.exhibitions.remove(record);
    };
} 

// Which customer groups are being targeted? This is the list of targetted groups.
function CustomerGroupsVM() {
	var self = this;
    self.customerGroups = ko.observableArray([]);
    
    self.AddCustomerGroup = function () {
    	var customerGroup = new CustomerGroup().description('');
    	customerGroup.AddExhibition(); // Every customer group needs a collection, otherwise there is no need for the customer group
        self.customerGroups.push(customerGroup);
        //console.log('Added Customer Group');
    };
    
    self.RemoveCustomerGroup = function (record) {
        console.log('Removing Customer Group');
        self.customerGroups.remove(record);
    };
    
    // Complete if the customer group description is more than 3 characters
    self.isComplete = ko.computed(function () {
        for (var i = 0; i < self.customerGroups().length; i++) {
            if (ko.toJS(self.customerGroups()[i].type) == '')
                return false;
            if (ko.toJS(self.customerGroups()[i].description().length) < 3)
                return false;
        }
        return true;
    });
    
    // Complete if the exhibitions descriptions is more than 3 characters
    self.isExhibitionsComplete = ko.computed(function () {
        for (var i = 0; i < self.customerGroups().length; i++) {
        	var customerGroup = self.customerGroups()[i];
        	for (var j = 0; j < customerGroup.exhibitions().length; j++) {
        		var collection = customerGroup.exhibitions()[j];
	            if (ko.toJS(collection.description().length) < 3)
	                return false;
        	}
        }
        return true;
    });
    
    // Complete if the priority descriptions is more than 3 characters
    self.isConstraintsComplete = ko.computed(function () {
        for (var i = 0; i < self.customerGroups().length; i++) {
        	var customerGroup = self.customerGroups()[i];
        	for (var j = 0; j < customerGroup.exhibitions().length; j++) {
        		var collection = customerGroup.exhibitions()[j];
	            if (ko.toJS(collection.constraintOperational().length) < 3)
	                return false;
	            if (ko.toJS(collection.constraintFinancial().length) < 3) 
	                return false;
	            if (ko.toJS(collection.constraintPolitical().length) < 3)
	                return false;
        	}
        }
        return true;
    });  
    
    self.isActionsComplete = ko.computed(function () {
        for (var i = 0; i < self.customerGroups().length; i++) {
        	var customerGroup = self.customerGroups()[i];
        	for (var j = 0; j < customerGroup.exhibitions().length; j++) {
        		var collection = customerGroup.exhibitions()[j];
	            if (ko.toJS(collection.actionVision().length) < 3)
	                return false;
	            if (ko.toJS(collection.actionFirstSteps().length) < 3)
	                return false;
	            if (ko.toJS(collection.actionDiscomfort().length) < 3)
	                return false;
        	}
        }
        return true;
    });   
}

function Exhibitions() {
	var self = this;
	self.intentVM = new IntentVM();
	self.customerGroupsVM = new CustomerGroupsVM();
	self.customerGroupsVM.AddCustomerGroup();
}

var exhibitions = new Exhibitions();
ko.applyBindings(exhibitions);
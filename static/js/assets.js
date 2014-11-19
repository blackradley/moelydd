/*
 * +----------------------------+
 * |Assets Strategy             |
 * |----------------------------|
 * |Intent - Socioeconomic      |
 * |Intent - Impact             |
 * |Intent - Artistic           |    +------------------------+
 * |Customer Groups (1 to many)+---->|Customer Groups         |
 * +----------------------------+    |------------------------|
 *                                   |Description             |    +-------------------------+
 *                                   |Collections (1 to many)+---->|Collections of interest  |
 *                                   +------------------------+    |-------------------------|
 *                                                                 |Description              |
 *                                                                 |Constraints - Financial  |
 *                                                                 |Constraints - Operational|
 *                                                                 |Constraints - Politial   |
 *                                                                 |Actions - Vision         |
 *                                                                 |Actions - First Steps    |
 *                                                                 |Actions - Discomfort     |
 *                                                                 +-------------------------+
 *                                                                 
 * (diagram at http://www.asciiflow.com/#Draw7633834548132838218/1634459312)
 * 
 */

// What are the goals or intents of the collections management
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

//What is the collection the customers are interested and what are the constraints and actions.
function CollectionOfInterest() {
  var self = this;
  self.description = ko.observable('');

  //Constraints
  self.isConstraintOperational = ko.observable(false);
  self.constraintOperational = ko.observable('');
  self.isConstraintFinancial = ko.observable(false);
  self.constraintFinancial = ko.observable('');
  self.isConstraintPolitical = ko.observable(false);
  self.constraintPolitical = ko.observable('');

  //Actions
  self.actionVision = ko.observable('');
  self.actionFirstSteps = ko.observable('');
  self.actionDiscomfort = ko.observable('');
}

var CustomerGroup = function () {
    var self = this;
    self.description = ko.observable('');
    self.collectionsOfInterest = ko.observableArray([]);
    
    self.AddCollection = function () {
    	var collectionOfInterest = new CollectionOfInterest().description('');
    	self.collectionsOfInterest.push(collectionOfInterest);
    	//console.log('Added Collection of Interest')
    }
    
    self.RemoveCollection = function (record) {
        //console.log('Removing Collection Group');
        self.collectionsOfInterest.remove(record);
    };
} 

// Which customer groups are being targeted.
function CustomerGroupsVM() {
	var self = this;
    self.customerGroups = ko.observableArray([]);
    
    self.AddCustomerGroup = function () {
    	var customerGroup = new CustomerGroup().description('');
    	customerGroup.AddCollection(); // Every customer group needs a collection, otherwise there is no need for the customer group
        self.customerGroups.push(customerGroup);
        //console.log('Added Customer Group');
    };
    
    self.RemoveCustomerGroup = function (record) {
        //console.log('Removing Customer Group');
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
    
    // Complete if the collections descriptions is more than 3 characters
    self.isCollectionsComplete = ko.computed(function () {
        for (var i = 0; i < self.customerGroups().length; i++) {
        	var customerGroup = self.customerGroups()[i];
        	for (var j = 0; j < customerGroup.collectionsOfInterest().length; j++) {
        		var collection = customerGroup.collectionsOfInterest()[j];
	            if (ko.toJS(collection.description().length) < 3)
	                return false;
        	}
        }
        return true;
    });
    
    self.isConstraintsComplete = ko.computed(function () {
        for (var i = 0; i < self.customerGroups().length; i++) {
        	var customerGroup = self.customerGroups()[i];
        	for (var j = 0; j < customerGroup.collectionsOfInterest().length; j++) {
        		var collection = customerGroup.collectionsOfInterest()[j];
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
        	for (var j = 0; j < customerGroup.collectionsOfInterest().length; j++) {
        		var collection = customerGroup.collectionsOfInterest()[j];
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

// The assets plan has intents and is directed at customer groups
function Assets() {
	var self = this;
	self.intentVM = new IntentVM();
	self.customerGroupsVM = new CustomerGroupsVM();
	self.customerGroupsVM.AddCustomerGroup();
}

var assets = new Assets();
ko.applyBindings(assets);
